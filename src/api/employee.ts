import {http} from "@/utils/http";
import {BaseResult, baseUrlApi} from "./utils";

/** 获取列表*/
export const findAllEmployee = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("employee/findAll"), {
        params
    });
};
export const getEmployeeList = (params?: object) => {
    return http.request<BaseResult>("get", baseUrlApi("employee/findByPage"), {
        params
    });
};
export const saveEmployeeApi = (data?: object) => {
    return http.request<BaseResult>("post", baseUrlApi("employee/add"), {
        data
    });
};
export const updateEmployeeApi = (data?: object) => {
    return http.request<BaseResult>("put", baseUrlApi("employee/update"), {
        data
    });
};
export const deleteEmployeeApi = (id?: number) => {
    return http.request<BaseResult>(
        "delete",
        baseUrlApi("employee/delete/" + id)
    );
};

