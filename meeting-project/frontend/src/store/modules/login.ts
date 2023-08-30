import { create } from "zustand";
import { login, register, updatePassword } from "@/services";

export const useLoginStore = create((set) => ({
  userInfo: {},
  isForgetPassword: true,
  async getUserInfo(data: unknown) {
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
  async userRegister(data: unknown) {
    try {
      const res = await register(data);
      console.log(res);
      if (res?.code === 201) return;
      throw new Error(res.data.message);
    } catch (error) {
      throw new Error(`注册失败: ${error}`);
    }
  },
  async updatePassword(data) {
    try {
      const res = await updatePassword(data);
      console.log(res);
      if (res?.code === 201) return;
      throw new Error(res.data.message);
    } catch (error) {
      throw new Error(`修改密码失败: ${error}`);
    }
  },
  setForgetPassword(isForgetPassword: boolean) {
    set({ isForgetPassword });
  },
}));
