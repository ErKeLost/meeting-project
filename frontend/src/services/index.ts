import Request from "./request";
const request = new Request({
  baseURL: "/api",
  timeout: 360000,
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      return config;
    },
    requestInterceptorCatch: (err: any) => err,
    responseInterceptor: (res: any) => res,
    responseInterceptorCatch: (err: any) => err,
  },
});

export { request };
export * from "./pages";
