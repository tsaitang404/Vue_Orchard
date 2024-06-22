import {message} from "@/utils/message";
import {deleteEmployeeApi, getEmployeeList, saveEmployeeApi, updateEmployeeApi} from "@/api/employee";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function useEmployee() {
    const form = reactive({
        name: null,
        phone: null,
        hireDate: null,
    });
    const dataList = ref([]);
    const loading = ref<boolean>(true);

    const pagination = reactive<PaginationProps>({
        total: 0,
        pageSize: 10,
        currentPage: 1,
        background: true
    });
    const columns: TableColumnList = [
        {
            label: "员工姓名",
            prop: "name",
            minWidth: 100
        },

        {
            label: "联系方式",
            prop: "phone",
            minWidth: 100
        },

        {
            label: "入职日期",
            prop: "hireDate",
            minWidth: 100
        },

        {
            label: "操作",
            fixed: "right",
            width: 180,
            slot: "operation"
        }
    ];
    const buttonClass = computed(() => {
        return [
            "!h-[20px]",
            "reset-margin",
            "!text-gray-500",
            "dark:!text-white",
            "dark:hover:!text-primary"
        ];
    });

    function handleSave(): void {
        dialogTitle.value = "新增员工";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        employee.value = row;
        dialogTitle.value = "修改员工";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deleteEmployeeApi(row.id);
        message("删除成功", {type: "success"});
        await onSearch();
    }

    async function handleSizeChange(val: number) {
        pagination.pageSize = val;
        await onSearch();
    }

    async function handleCurrentChange(val: number) {
        pagination.currentPage = val;
        await onSearch();
    }

    function handleSelectionChange(val) {
        console.log("handleSelectionChange", val);
    }

    async function onSearch() {
        loading.value = true;
        const params: any = {
            name: form?.name,
            phone: form?.phone,
            hireDate: form?.hireDate,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getEmployeeList(params);
        dataList.value = data.records;

        pagination.total = data.total;
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }

    const resetForm = async formEl => {
        if (!formEl) return;
        formEl.resetFields();
        await onSearch();
    };

    onMounted(async () => {
        await onSearch();
    });
    const isShowDialog = ref(false);
    const dialogTitle = ref("");

    const confirm = async () => {
        if (dialogTitle.value == "新增员工") {
            const {data} = await saveEmployeeApi(employee.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updateEmployeeApi(employee.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const employee = ref({
        id: null,
        name: null,
        phone: null,
        hireDate: null,

    });
    const resetEmployee = ref({
        ...employee.value
    });
    const close = () => {
        employee.value = JSON.parse(JSON.stringify(resetEmployee.value));
    };
    return {
        form,
        close,
        confirm,
        employee,
        isShowDialog,
        dialogTitle,
        loading,
        columns,
        dataList,
        pagination,
        buttonClass,
        onSearch,
        resetForm,
        handleSave,
        handleUpdate,
        handleDelete,
        handleSizeChange,
        handleCurrentChange,
        handleSelectionChange
    };
}


