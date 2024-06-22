import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllSoilManagementRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("soilManagementRecord/findAll"), {
        params
    });
};
export const getSoilManagementRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("soilManagementRecord/findByPage"), {
        params
    });
};
export const saveSoilManagementRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("soilManagementRecord/add"), {
        data
    });
};
export const updateSoilManagementRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("soilManagementRecord/update"), {
        data
    });
};
export const deleteSoilManagementRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("soilManagementRecord/delete/" + id)
    );
};

