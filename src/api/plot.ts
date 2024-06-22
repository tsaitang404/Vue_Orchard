import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";

/** 获取列表*/
export const findAllPlot = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("plot/findAll"), {
    params
  });
};
export const getPlotList = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("plot/findByPage"), {
    params
  });
};
export const savePlotApi = (data?: object) => {
  return http.request<BaseResult>("post", baseUrlApi("plot/add"), {
    data
  });
};
export const updatePlotApi = (data?: object) => {
  return http.request<BaseResult>("put", baseUrlApi("plot/update"), {
    data
  });
};
export const deletePlotApi = (id?: number) => {
  return http.request<BaseResult>("delete", baseUrlApi("plot/delete/" + id));
};
