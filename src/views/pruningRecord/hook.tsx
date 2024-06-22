import { message } from "@/utils/message";
import {
  deletePruningRecordApi,
  getPruningRecordList,
  savePruningRecordApi,
  updatePruningRecordApi
} from "@/api/pruningRecord";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function usePruningRecord() {
  const form = reactive({
    plotId: null,
    treeId: null,
    pruningDate: null,
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
      label: "修剪日期",
      prop: "pruningDate",
      minWidth: 100
    },

    {
      label: "修剪方法（如剪枝、修整等）",
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
    dialogTitle.value = "新增修剪记录";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    pruningRecord.value = row;
    dialogTitle.value = "修改修剪记录";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deletePruningRecordApi(row.id);
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
      pruningDate: form?.pruningDate,
      method: form?.method,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getPruningRecordList(params);
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
    if (dialogTitle.value == "新增修剪记录") {
      const { data } = await savePruningRecordApi(pruningRecord.value);
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updatePruningRecordApi(pruningRecord.value);
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const pruningRecord = ref({
    id: null,
    plotId: null,
    treeId: null,
    pruningDate: null,
    method: null
  });
  const resetPruningRecord = ref({
    ...pruningRecord.value
  });
  const close = () => {
    pruningRecord.value = JSON.parse(JSON.stringify(resetPruningRecord.value));
  };
  return {
    form,
    close,
    confirm,
    pruningRecord,
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
