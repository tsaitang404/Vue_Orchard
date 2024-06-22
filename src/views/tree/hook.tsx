import { message } from "@/utils/message";
import {
  deleteTreeApi,
  getTreeList,
  saveTreeApi,
  updateTreeApi
} from "@/api/tree";

import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function useTree() {
  const form = reactive({
    species: null,
    plantingDate: null,
    age: null,
    count: null,
    area: null,
    plotId: null
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
      label: "果树品种",
      prop: "species",
      minWidth: 100
    },

    {
      label: "种植日期",
      prop: "plantingDate",
      minWidth: 100
    },

    {
      label: "果树年龄（年）",
      prop: "age",
      minWidth: 100
    },

    {
      label: "果树数量（棵）",
      prop: "count",
      minWidth: 100
    },

    {
      label: "果树占地面积（平方米）",
      prop: "area",
      minWidth: 100
    },

    {
      label: "地块ID",
      prop: "plotId",
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
    dialogTitle.value = "新增果树";
    isShowDialog.value = true;
  }

  function handleUpdate(row) {
    tree.value = row;
    dialogTitle.value = "修改果树";
    isShowDialog.value = true;
  }

  async function handleDelete(row) {
    await deleteTreeApi(row.id);
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
      species: form?.species,
      plantingDate: form?.plantingDate,
      age: form?.age,
      count: form?.count,
      area: form?.area,
      plotId: form?.plotId,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    };
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === "" || value === undefined) {
        Reflect.deleteProperty(params, key);
      }
    }

    const { data } = await getTreeList(params);
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
    if (dialogTitle.value == "新增果树") {
      const { data } = await saveTreeApi(tree.value);
      if (data) {
        message("新增成功", { type: "success" });
      }
    } else {
      const { data } = await updateTreeApi(tree.value);
      if (data) {
        message("修改成功", { type: "success" });
      }
    }
    isShowDialog.value = false;
    await onSearch();
  };
  const tree = ref({
    id: null,
    species: null,
    plantingDate: null,
    age: null,
    count: null,
    area: null,
    plotId: null
  });
  const resetTree = ref({
    ...tree.value
  });
  const close = () => {
    tree.value = JSON.parse(JSON.stringify(resetTree.value));
  };
  return {
    form,
    close,
    confirm,
    tree,
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
