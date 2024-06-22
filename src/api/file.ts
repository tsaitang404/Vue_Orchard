import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";
export const uploadFile = (data?: object) => {
  return http.request<BaseResult>("post", baseUrlApi("file/upload/img"), {
    data: data,
    headers: {
      "Content-Type": "multipart/form-data; charset=utf-8"
    }
  });
};
