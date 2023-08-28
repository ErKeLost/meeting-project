import { request } from "..";

export function login(data: { username: string; password: string }) {
  return request.post({
    url: "/user/login",
    data,
  });
}
