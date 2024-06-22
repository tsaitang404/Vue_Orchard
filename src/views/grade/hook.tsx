import {message} from "@/utils/message";
import {deleteGradeApi, getGradeList, saveGradeApi, updateGradeApi} from "@/api/grade";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function useGrade() {
    const form = reactive({
        gradeName: null,
        description: null,
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
            label: "品级名称（如A级、B级等）",
            prop: "gradeName",
            minWidth: 100
        },

        {
            label: "品级描述",
            prop: "description",
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
        dialogTitle.value = "新增品级";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        grade.value = row;
        dialogTitle.value = "修改品级";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deleteGradeApi(row.id);
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
            gradeName: form?.gradeName,
            description: form?.description,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getGradeList(params);
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
        if (dialogTitle.value == "新增品级") {
            const {data} = await saveGradeApi(grade.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updateGradeApi(grade.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const grade = ref({
        id: null,
        gradeName: null,
        description: null,

    });
    const resetGrade = ref({
        ...grade.value
    });
    const close = () => {
        grade.value = JSON.parse(JSON.stringify(resetGrade.value));
    };
    return {
        form,
        close,
        confirm,
        grade,
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


