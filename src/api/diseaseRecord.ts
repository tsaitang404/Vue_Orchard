import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllDiseaseRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("diseaseRecord/findAll"), {
        params
    });
};
export const getDiseaseRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("diseaseRecord/findByPage"), {
        params
    });
};
export const saveDiseaseRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("diseaseRecord/add"), {
        data
    });
};
export const updateDiseaseRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("diseaseRecord/update"), {
        data
    });
};
export const deleteDiseaseRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("diseaseRecord/delete/" + id)
    );
};

