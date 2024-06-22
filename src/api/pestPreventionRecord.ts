import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllPestPreventionRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pestPreventionRecord/findAll"), {
        params
    });
};
export const getPestPreventionRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pestPreventionRecord/findByPage"), {
        params
    });
};
export const savePestPreventionRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("pestPreventionRecord/add"), {
        data
    });
};
export const updatePestPreventionRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("pestPreventionRecord/update"), {
        data
    });
};
export const deletePestPreventionRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("pestPreventionRecord/delete/" + id)
    );
};

