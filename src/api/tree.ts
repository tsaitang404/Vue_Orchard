import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";

/** 获取列表*/
export const findAllTree = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("tree/findAll"), {
    params
  });
};
export const getTreeList = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("tree/findByPage"), {
    params
  });
};
export const saveTreeApi = (data?: object) => {
  return http.request<BaseResult>("post", baseUrlApi("tree/add"), {
    data
  });
};
export const updateTreeApi = (data?: object) => {
  return http.request<BaseResult>("put", baseUrlApi("tree/update"), {
    data
  });
};
export const deleteTreeApi = (id?: number) => {
  return http.request<BaseResult>("delete", baseUrlApi("tree/delete/" + id));
};
