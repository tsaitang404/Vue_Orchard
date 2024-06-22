import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllFertilizationRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("fertilizationRecord/findAll"), {
        params
    });
};
export const getFertilizationRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("fertilizationRecord/findByPage"), {
        params
    });
};
export const saveFertilizationRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("fertilizationRecord/add"), {
        data
    });
};
export const updateFertilizationRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("fertilizationRecord/update"), {
        data
    });
};
export const deleteFertilizationRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("fertilizationRecord/delete/" + id)
    );
};

