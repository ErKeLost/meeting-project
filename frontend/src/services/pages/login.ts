import { request } from "..";

export function login(data: { username: string; password: string }) {
  return request.post({
    url: "/user/login",
    data,
  });
}

export function register(data: any) {
  return request.post({
    url: "/user/register",
    data,
  });
}

export function updatePassword(data) {
  return request.post({
    url: "/user/updatePassword",
    data,
  });
}

export function testLogin() {
  return request.get({
    url: "/bbb",
  });
}
