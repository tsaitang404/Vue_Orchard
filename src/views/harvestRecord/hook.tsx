import {message} from "@/utils/message";
import {
    deleteHarvestRecordApi,
    getHarvestRecordList,
    saveHarvestRecordApi,
    updateHarvestRecordApi
} from "@/api/harvestRecord";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function useHarvestRecord() {
    const form = reactive({
        plotId: null,
        treeId: null,
        harvestDate: null,
        yield: null,
        quality: null,
        salesDestination: null,
        pricePerKg: null,
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
            label: "采摘日期",
            prop: "harvestDate",
            minWidth: 100
        },

        {
            label: "产量（公斤）",
            prop: "yield",
            minWidth: 100
        },

        {
            label: "水果品质（如A级、B级等）",
            prop: "quality",
            minWidth: 100
        },

        {
            label: "销售去向",
            prop: "salesDestination",
            minWidth: 100
        },

        {
            label: "每公斤价格（元）",
            prop: "pricePerKg",
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
        dialogTitle.value = "新增采摘记录";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        harvestRecord.value = row;
        dialogTitle.value = "修改采摘记录";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deleteHarvestRecordApi(row.id);
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
            harvestDate: form?.harvestDate,
            yield: form?.yield,
            quality: form?.quality,
            salesDestination: form?.salesDestination,
            pricePerKg: form?.pricePerKg,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getHarvestRecordList(params);
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
        if (dialogTitle.value == "新增采摘记录") {
            const {data} = await saveHarvestRecordApi(harvestRecord.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updateHarvestRecordApi(harvestRecord.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const harvestRecord = ref({
        id: null,
        plotId: null,
        treeId: null,
        harvestDate: null,
        yield: null,
        quality: null,
        salesDestination: null,
        pricePerKg: null,

    });
    const resetHarvestRecord = ref({
        ...harvestRecord.value
    });
    const close = () => {
        harvestRecord.value = JSON.parse(JSON.stringify(resetHarvestRecord.value));
    };
    return {
        form,
        close,
        confirm,
        harvestRecord,
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


