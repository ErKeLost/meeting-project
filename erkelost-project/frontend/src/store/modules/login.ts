import { create } from "zustand";
import { login, register, updatePassword, userInfo } from "@/services";

export const useLoginStore = create((set) => ({
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? {},
  isForgetPassword: false,
  async getUserInfoData() {
    try {
      const res = await userInfo();
      console.log(res);

      if (res?.code === 200) {
        set({ userInfo: res.data });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        return res.data.userInfo;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      throw new Error(`获取用户信息失败: ${error}`);
    }
  },
  async getUserInfo(data: unknown) {
    try {
      const res = await login(data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      if (res?.code === 201) {
        set({ userInfo: res.data.userInfo });
        localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
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
