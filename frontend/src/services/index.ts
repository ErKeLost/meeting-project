import { AxiosInstance } from "axios";
import Request from "./request";

const request = new Request({
  baseURL: "/api",
  timeout: 360000,
  interceptors: {
    requestInterceptor: (config: any) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
      // 携带token的拦截
      return config;
    },
    requestInterceptorCatch: (error: any) => error,
    responseInterceptor: (res: any) => {
      const { config, data } = res;
      return new Promise((resolve) => {
        if (data.code === 401) {
          /**
           * refreshToken 为封装的有关更新 token 的相关操作
           */

          refreshToken(() => {
            resolve(request.instance(config));
          });
        }
        return resolve(res);
      });
    },
    responseInterceptorCatch: (error: any) => {
      return error;
    },
  },
});

export { request };
export * from "./pages";

// 存储由于 token 过期导致 失败的请求
let expiredRequestArr: any[] = [];

/**
 * 存储当前因为 token 失效导致发送失败的请求
 */
const saveErrorRequest = (expiredRequest: () => any) => {
  expiredRequestArr.push(expiredRequest);
};

// 避免频繁发送更新
let firstRequest = true;
/**
 * 利用 refreshToken 更新当前使用的 token
 */
const updateTokenByRefreshToken = () => {
  firstRequest = false;
  request
    .post({
      url: "/user/refresh",
      data: {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    })
    .then((res) => {
      const { refresh_token, access_token } = res.data;
      // 更新本地的token
      localStorage.setItem("accessToken", access_token);
      // 更新请求头中的 token
      setAxiosHeader(request.instance, access_token);
      localStorage.setItem("refreshToken", refresh_token);

      /**
       * 当获取了最新的 refreshToken, accessToken 后
       * 重新发起之前失败的请求
       */
      expiredRequestArr.forEach((request) => {
        request();
      });
      expiredRequestArr = [];
      firstRequest = true;
    })
    .catch((err) => {
      console.log("刷新 token 失败err", err);
      /**
       * 此时 refreshToken 也已经失效了
       * 返回登录页，让用户重新进行登录操作
       */
      firstRequest = true;
    });
};

/**
 * 更新当前已过期的 token
 * @param expiredRequest 回调函数，返回由token过期导致失败的请求
 */
export const refreshToken = (expiredRequest: () => any) => {
  saveErrorRequest(expiredRequest);

  if (firstRequest) {
    updateTokenByRefreshToken();
  }
};

function setAxiosHeader(instance: AxiosInstance, newAccessToken: string) {
  // 设置新的 Authorization Header
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${newAccessToken}`;
}
