import {message} from "@/utils/message";
import {
    deleteIrrigationRecordApi,
    getIrrigationRecordList,
    saveIrrigationRecordApi,
    updateIrrigationRecordApi
} from "@/api/irrigationRecord";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function useIrrigationRecord() {
    const form = reactive({
        plotId: null,
        treeId: null,
        irrigationDate: null,
        amount: null,
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
            label: "灌溉日期",
            prop: "irrigationDate",
            minWidth: 100
        },

        {
            label: "灌溉量（升）",
            prop: "amount",
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
        dialogTitle.value = "新增灌溉记录";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        irrigationRecord.value = row;
        dialogTitle.value = "修改灌溉记录";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deleteIrrigationRecordApi(row.id);
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
            irrigationDate: form?.irrigationDate,
            amount: form?.amount,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getIrrigationRecordList(params);
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
        if (dialogTitle.value == "新增灌溉记录") {
            const {data} = await saveIrrigationRecordApi(irrigationRecord.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updateIrrigationRecordApi(irrigationRecord.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const irrigationRecord = ref({
        id: null,
        plotId: null,
        treeId: null,
        irrigationDate: null,
        amount: null,

    });
    const resetIrrigationRecord = ref({
        ...irrigationRecord.value
    });
    const close = () => {
        irrigationRecord.value = JSON.parse(JSON.stringify(resetIrrigationRecord.value));
    };
    return {
        form,
        close,
        confirm,
        irrigationRecord,
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


