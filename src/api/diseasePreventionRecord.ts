import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";

/** 获取列表*/
export const findAllDiseasePreventionRecord = (params?: object) => {
  return http.request<BaseResult>(
    "get",
    baseUrlApi("diseasePreventionRecord/findAll"),
    {
      params
    }
  );
};
export const getDiseasePreventionRecordList = (params?: object) => {
  return http.request<BaseResult>(
    "get",
    baseUrlApi("diseasePreventionRecord/findByPage"),
    {
      params
    }
  );
};
export const saveDiseasePreventionRecordApi = (data?: object) => {
  return http.request<BaseResult>(
    "post",
    baseUrlApi("diseasePreventionRecord/add"),
    {
      data
    }
  );
};
export const updateDiseasePreventionRecordApi = (data?: object) => {
  return http.request<BaseResult>(
    "put",
    baseUrlApi("diseasePreventionRecord/update"),
    {
      data
    }
  );
};
export const deleteDiseasePreventionRecordApi = (id?: number) => {
  return http.request<BaseResult>(
    "delete",
    baseUrlApi("diseasePreventionRecord/delete/" + id)
  );
};
