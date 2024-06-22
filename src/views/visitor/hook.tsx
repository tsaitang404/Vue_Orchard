import { message } from "@/utils/message";
import {
  deleteVisitorApi,
  getVisitorList,
  saveVisitorApi,
  updateVisitorApi
} from "@/api/visitor";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function useVisitor() {
  const form = reactive({
    name: null,
    visitDate: null,
    purpose: null
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
      label: "游客姓名",
      prop: "name",
      minWidth: 100
    },

    {
      label: "访问日期",
      prop: "visitDate",
      minWidth: 100
    },

    {
      label: "访问目的",
      prop: "purpose",
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
    dialogTitle.value = "新增游客";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    visitor.value = row;
    dialogTitle.value = "修改游客";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deleteVisitorApi(row.id);
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
      name: form?.name,
      visitDate: form?.visitDate,
      purpose: form?.purpose,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getVisitorList(params);
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
    if (dialogTitle.value == "新增游客") {
      const { data } = await saveVisitorApi(visitor.value);
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updateVisitorApi(visitor.value);
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const visitor = ref({
    id: null,
    name: null,
    visitDate: null,
    purpose: null
  });
  const resetVisitor = ref({
    ...visitor.value
  });
  const close = () => {
    visitor.value = JSON.parse(JSON.stringify(resetVisitor.value));
  };
  return {
    form,
    close,
    confirm,
    visitor,
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
