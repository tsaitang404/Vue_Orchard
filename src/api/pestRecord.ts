import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllPestRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pestRecord/findAll"), {
        params
    });
};
export const getPestRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pestRecord/findByPage"), {
        params
    });
};
export const savePestRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("pestRecord/add"), {
        data
    });
};
export const updatePestRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("pestRecord/update"), {
        data
    });
};
export const deletePestRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("pestRecord/delete/" + id)
    );
};

