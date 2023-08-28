import { create } from "zustand";
import { login } from "@/services";
import { message } from "antd";
// export const useLoginStore = create((set) => {
//   const [messageApi, contextHolder] = message.useMessage();
//   return {
//     userInfo: {},
//     getUserInfo: async (userInfo) => {
//       try {
//         const res = await login(userInfo);
//         console.log(res);
//         if (res.code === 201) {
//           messageApi.success(`登录成功`);
//           const newUserInfo = res.data.userInfo;
//           set({ userInfo: newUserInfo });
//           return;
//         } else {
//           messageApi.error(`${res.data.message}`);
//           return;
//         }
//       } catch (error) {
//         messageApi.error(`Login failed: ${error}`);
//       }
//     },
//   };
// });

export const useLoginStore = create((set) => ({
  userInfo: {},
  getUserInfo: async (data) => {
    try {
      const res = await login(data);
      console.log(res);
      if (res.code === 201) {
        set({ userInfo: res.data.userInfo });
        return;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      throw new Error(`登录失败: ${error}`);
    }
  },
}));
