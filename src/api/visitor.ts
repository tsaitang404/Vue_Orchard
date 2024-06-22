import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllVisitor = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("visitor/findAll"), {
        params
    });
};
export const getVisitorList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("visitor/findByPage"), {
        params
    });
};
export const saveVisitorApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("visitor/add"), {
        data
    });
};
export const updateVisitorApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("visitor/update"), {
        data
    });
};
export const deleteVisitorApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("visitor/delete/" + id)
    );
};

