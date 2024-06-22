import { http } from "@/utils/http";
import { BaseResult, baseUrlApi } from "./utils";

/** 获取列表*/
export const findAllHarvestRecord = (params?: object) => {
  return http.request<BaseResult>("get", baseUrlApi("harvestRecord/findAll"), {
    params
  });
};
export const getHarvestRecordList = (params?: object) => {
  return http.request<BaseResult>(
    "get",
    baseUrlApi("harvestRecord/findByPage"),
    {
      params
    }
  );
};
export const saveHarvestRecordApi = (data?: object) => {
  return http.request<BaseResult>("post", baseUrlApi("harvestRecord/add"), {
    data
  });
};
export const updateHarvestRecordApi = (data?: object) => {
  return http.request<BaseResult>("put", baseUrlApi("harvestRecord/update"), {
    data
  });
};
export const deleteHarvestRecordApi = (id?: number) => {
  return http.request<BaseResult>(
    "delete",
    baseUrlApi("harvestRecord/delete/" + id)
  );
};
