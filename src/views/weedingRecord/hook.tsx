import { message } from "@/utils/message";
import {
  deleteWeedingRecordApi,
  getWeedingRecordList,
  saveWeedingRecordApi,
  updateWeedingRecordApi
} from "@/api/weedingRecord";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function useWeedingRecord() {
  const form = reactive({
    plotId: null,
    treeId: null,
    weedingDate: null,
    method: null
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
      label: "除草日期",
      prop: "weedingDate",
      minWidth: 100
    },

    {
      label: "除草方法",
      prop: "method",
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
    dialogTitle.value = "新增除草记录";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    weedingRecord.value = row;
    dialogTitle.value = "修改除草记录";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deleteWeedingRecordApi(row.id);
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
      treeId: form?.treeId,
      weedingDate: form?.weedingDate,
      method: form?.method,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getWeedingRecordList(params);
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
    if (dialogTitle.value == "新增除草记录") {
      const { data } = await saveWeedingRecordApi(weedingRecord.value);
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updateWeedingRecordApi(weedingRecord.value);
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const weedingRecord = ref({
    id: null,
    plotId: null,
    treeId: null,
    weedingDate: null,
    method: null
  });
  const resetWeedingRecord = ref({
    ...weedingRecord.value
  });
  const close = () => {
    weedingRecord.value = JSON.parse(JSON.stringify(resetWeedingRecord.value));
  };
  return {
    form,
    close,
    confirm,
    weedingRecord,
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
