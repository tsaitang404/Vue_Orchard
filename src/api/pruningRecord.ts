import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllPruningRecord = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pruningRecord/findAll"), {
        params
    });
};
export const getPruningRecordList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("pruningRecord/findByPage"), {
        params
    });
};
export const savePruningRecordApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("pruningRecord/add"), {
        data
    });
};
export const updatePruningRecordApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("pruningRecord/update"), {
        data
    });
};
export const deletePruningRecordApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("pruningRecord/delete/" + id)
    );
};

