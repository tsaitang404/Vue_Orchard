import { message } from "@/utils/message";
import {
  deleteSoilManagementRecordApi,
  getSoilManagementRecordList,
  saveSoilManagementRecordApi,
  updateSoilManagementRecordApi
} from "@/api/soilManagementRecord";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function useSoilManagementRecord() {
  const form = reactive({
    plotId: null,
    managementDate: null,
    method: null,
    details: null
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
      label: "土壤管理日期",
      prop: "managementDate",
      minWidth: 100
    },

    {
      label: "管理方法（如深翻、改良等）",
      prop: "method",
      minWidth: 100
    },

    {
      label: "详细信息",
      prop: "details",
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
    dialogTitle.value = "新增土壤管理记录";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    soilManagementRecord.value = row;
    dialogTitle.value = "修改土壤管理记录";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deleteSoilManagementRecordApi(row.id);
    message("删除成功", { type: "success" });
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
      managementDate: form?.managementDate,
      method: form?.method,
      details: form?.details,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getSoilManagementRecordList(params);
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
    if (dialogTitle.value == "新增土壤管理记录") {
      const { data } = await saveSoilManagementRecordApi(
        soilManagementRecord.value
      );
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updateSoilManagementRecordApi(
        soilManagementRecord.value
      );
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const soilManagementRecord = ref({
    id: null,
    plotId: null,
    managementDate: null,
    method: null,
    details: null
  });
  const resetSoilManagementRecord = ref({
    ...soilManagementRecord.value
  });
  const close = () => {
    soilManagementRecord.value = JSON.parse(
      JSON.stringify(resetSoilManagementRecord.value)
    );
  };
  return {
    form,
    close,
    confirm,
    soilManagementRecord,
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
