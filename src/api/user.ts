import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";

/** 获取列表*/
export const getList = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("user/findByPage"), {
    params
  });
};
export const saveApi = (data?: object) => {
  return http.request<BaseResult>("post", baseUrlApi("user/add"), {
    data
  });
};
export const updateApi = (data?: object) => {
  return http.request<BaseResult>("put", baseUrlApi("user/update"), {
    data
  });
};
export const deleteApi = (id?: number) => {
  return http.request<BaseResult>("delete", baseUrlApi("user/delete/" + id));
};
export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
    user: object;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("user/login"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "post",
    baseUrlApi("user/refreshToken"),
    { data }
  );
};
