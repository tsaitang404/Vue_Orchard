import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllWeedingRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("weedingRecord/findAll"), {
        params
    });
};
export const getWeedingRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("weedingRecord/findByPage"), {
        params
    });
};
export const saveWeedingRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("weedingRecord/add"), {
        data
    });
};
export const updateWeedingRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("weedingRecord/update"), {
        data
    });
};
export const deleteWeedingRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("weedingRecord/delete/" + id)
    );
};

