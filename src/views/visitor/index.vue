<template>
  <div class="main">
    <el-dialog
      @close="close"
      top="10vh"
      :title="dialogTitle"
      v-model="isShowDialog"
    >
      <el-form ref="visitorFormRef" :model="visitor" label-width="80px">
        <el-form-item prop="name" label="游客姓名">
          <el-input v-model="visitor.name" placeholder="请输入游客姓名" />
        </el-form-item>
        <el-form-item prop="visitDate" label="访问日期">
          <el-input v-model="visitor.visitDate" placeholder="请输入访问日期" />
        </el-form-item>
        <el-form-item prop="purpose" label="访问目的">
          <el-input
            v-model="visitor.purpose"
            placeholder="请输入访问目的（如采摘、参观等）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item prop="name" label="游客姓名">
        <el-input v-model="form.name" placeholder="请输入游客姓名" />
      </el-form-item>
      <el-form-item prop="visitDate" label="访问日期">
        <el-input v-model="form.visitDate" placeholder="请输入访问日期" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="游客列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          @click="handleSave"
          type="primary"
          :icon="useRenderIcon(AddFill)"
        >
          新增游客
        </el-button>
      </template>
      <template v-slot="{ size }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="columns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="handleUpdate(row)"
            >
              修改
            </el-button>
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVisitor } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "visitor"
});

const formRef = ref();
const visitorFormRef = ref();

const {
  form,
  close,
  loading,
  visitor,
  columns,
  dataList,
  dialogTitle,
  isShowDialog,
  pagination,
  confirm,
  onSearch,
  resetForm,
  handleSave,
  handleUpdate,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useVisitor();
</script>
<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
