import { create } from "zustand";
import { login, register } from "@/services";

export const useLoginStore = create((set) => ({
  userInfo: {},
  async getUserInfo(data: any) {
    try {
      const res = await login(data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      if (res?.code === 201) {
        set({ userInfo: res.data.userInfo });
        return res.data.userInfo;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      throw new Error(`登录失败: ${error}`);
    }
  },
  async userRegister(data: any) {
    try {
      const res = await register(data);
      console.log(res);
      if (res?.code === 201) return;
      throw new Error(res.data.message);
    } catch (error) {
      throw new Error(`注册失败: ${error}`);
    }
  },
}));
