import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllGrade = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("grade/findAll"), {
        params
    });
};
export const getGradeList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("grade/findByPage"), {
        params
    });
};
export const saveGradeApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("grade/add"), {
        data
    });
};
export const updateGradeApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("grade/update"), {
        data
    });
};
export const deleteGradeApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("grade/delete/" + id)
    );
};

