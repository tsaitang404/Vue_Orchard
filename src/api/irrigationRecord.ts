import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllIrrigationRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("irrigationRecord/findAll"), {
        params
    });
};
export const getIrrigationRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("irrigationRecord/findByPage"), {
        params
    });
};
export const saveIrrigationRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("irrigationRecord/add"), {
        data
    });
};
export const updateIrrigationRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("irrigationRecord/update"), {
        data
    });
};
export const deleteIrrigationRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("irrigationRecord/delete/" + id)
    );
};

