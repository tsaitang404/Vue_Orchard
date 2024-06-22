import {message} from "@/utils/message";
import {
    deleteDiseaseRecordApi,
    getDiseaseRecordList,
    saveDiseaseRecordApi,
    updateDiseaseRecordApi
} from "@/api/diseaseRecord";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function useDiseaseRecord() {
    const form = reactive({
        plotId: null,
        treeId: null,
        diseaseDate: null,
        diseaseType: null,
        severity: null,
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
            label: "地块ID",
            prop: "plotId",
            minWidth: 100
        },

        {
            label: "果树ID",
            prop: "treeId",
            minWidth: 100
        },

        {
            label: "发现病害日期",
            prop: "diseaseDate",
            minWidth: 100
        },

        {
            label: "病害类型",
            prop: "diseaseType",
            minWidth: 100
        },

        {
            label: "病害严重程度",
            prop: "severity",
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
        dialogTitle.value = "新增病害记录";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        diseaseRecord.value = row;
        dialogTitle.value = "修改病害记录";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deleteDiseaseRecordApi(row.id);
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
            plotId: form?.plotId,
            treeId: form?.treeId,
            diseaseDate: form?.diseaseDate,
            diseaseType: form?.diseaseType,
            severity: form?.severity,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getDiseaseRecordList(params);
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
        if (dialogTitle.value == "新增病害记录") {
            const {data} = await saveDiseaseRecordApi(diseaseRecord.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updateDiseaseRecordApi(diseaseRecord.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const diseaseRecord = ref({
        id: null,
        plotId: null,
        treeId: null,
        diseaseDate: null,
        diseaseType: null,
        severity: null,

    });
    const resetDiseaseRecord = ref({
        ...diseaseRecord.value
    });
    const close = () => {
        diseaseRecord.value = JSON.parse(JSON.stringify(resetDiseaseRecord.value));
    };
    return {
        form,
        close,
        confirm,
        diseaseRecord,
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

