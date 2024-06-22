import { message } from "@/utils/message";
import {
  deleteFertilizationRecordApi,
  getFertilizationRecordList,
  saveFertilizationRecordApi,
  updateFertilizationRecordApi
} from "@/api/fertilizationRecord";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function useFertilizationRecord() {
  const form = reactive({
    plotId: null,
    treeId: null,
    fertilizationDate: null,
    fertilizerType: null,
    amount: null
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
      label: "施肥日期",
      prop: "fertilizationDate",
      minWidth: 100
    },

    {
      label: "肥料类型",
      prop: "fertilizerType",
      minWidth: 100
    },

    {
      label: "施肥量（公斤）",
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
    dialogTitle.value = "新增施肥记录";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    fertilizationRecord.value = row;
    dialogTitle.value = "修改施肥记录";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deleteFertilizationRecordApi(row.id);
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
      fertilizationDate: form?.fertilizationDate,
      fertilizerType: form?.fertilizerType,
      amount: form?.amount,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getFertilizationRecordList(params);
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
    if (dialogTitle.value == "新增施肥记录") {
      const { data } = await saveFertilizationRecordApi(
        fertilizationRecord.value
      );
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updateFertilizationRecordApi(
        fertilizationRecord.value
      );
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const fertilizationRecord = ref({
    id: null,
    plotId: null,
    treeId: null,
    fertilizationDate: null,
    fertilizerType: null,
    amount: null
  });
  const resetFertilizationRecord = ref({
    ...fertilizationRecord.value
  });
  const close = () => {
    fertilizationRecord.value = JSON.parse(
      JSON.stringify(resetFertilizationRecord.value)
    );
  };
  return {
    form,
    close,
    confirm,
    fertilizationRecord,
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
