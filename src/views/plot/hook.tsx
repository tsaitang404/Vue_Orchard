import {message} from "@/utils/message";
import {deletePlotApi, getPlotList, savePlotApi, updatePlotApi} from "@/api/plot";

import {type PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";

export function usePlot() {
    const form = reactive({
        location: null,
        area: null,
        sunlightDuration: null,
        soilCharacteristics: null,
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
            label: "地块位置",
            prop: "location",
            minWidth: 100
        },

        {
            label: "地块面积（平方米）",
            prop: "area",
            minWidth: 100
        },

        {
            label: "日照时长（小时）",
            prop: "sunlightDuration",
            minWidth: 100
        },

        {
            label: "土壤特性（如酸碱度等）",
            prop: "soilCharacteristics",
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
        dialogTitle.value = "新增地块";
        isShowDialog.value = true;
    }

    function handleUpdate(row) {
        plot.value = row;
        dialogTitle.value = "修改地块";
        isShowDialog.value = true;
    }

    async function handleDelete(row) {
        await deletePlotApi(row.id);
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
            location: form?.location,
            area: form?.area,
            sunlightDuration: form?.sunlightDuration,
            soilCharacteristics: form?.soilCharacteristics,
            pageSize: pagination.pageSize,
            pageNum: pagination.currentPage
        };
        for (const [key, value] of Object.entries(params)) {
            if (value === null || value === "" || value === undefined) {
                Reflect.deleteProperty(params, key);
            }
        }

        const {data} = await getPlotList(params);
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
        if (dialogTitle.value == "新增地块") {
            const {data} = await savePlotApi(plot.value);
            if (data) {
                message("新增成功", {type: "success"});
            }
        } else {
            const {data} = await updatePlotApi(plot.value);
            if (data) {
                message("修改成功", {type: "success"});
            }
        }
        isShowDialog.value = false;
        await onSearch();
    };
    const plot = ref({
        id: null,
        location: null,
        area: null,
        sunlightDuration: null,
        soilCharacteristics: null,

    });
    const resetPlot = ref({
        ...plot.value
    });
    const close = () => {
        plot.value = JSON.parse(JSON.stringify(resetPlot.value));
    };
    return {
        form,
        close,
        confirm,
        plot,
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


