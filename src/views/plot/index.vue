<template>
  <div class="main">
    <el-dialog
      @close="close"
      top="10vh"
      :title="dialogTitle"
      v-model="isShowDialog"
    >
      <el-form ref="plotFormRef" :model="plot" label-width="80px">
        <el-form-item prop="location" label="地块位置">
          <el-input v-model="plot.location" placeholder="请输入地块位置" />
        </el-form-item>
        <el-form-item prop="area" label="地块面积">
          <el-input
            v-model="plot.area"
            placeholder="请输入地块面积（平方米）"
          />
        </el-form-item>
        <el-form-item prop="sunlightDuration" label="日照时长">
          <el-input
            v-model="plot.sunlightDuration"
            placeholder="请输入日照时长（小时）"
          />
        </el-form-item>
        <el-form-item prop="soilCharacteristics" label="土壤特性">
          <el-input
            type="textarea"
            v-model="plot.soilCharacteristics"
            placeholder="请输入土壤特性（如酸碱度等）"
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
      <el-form-item prop="location" label="地块位置">
        <el-input v-model="form.location" placeholder="请输入地块位置" />
      </el-form-item>
      <el-form-item prop="area" label="地块面积（平方米）">
        <el-input v-model="form.area" placeholder="请输入地块面积（平方米）" />
      </el-form-item>
      <el-form-item prop="sunlightDuration" label="日照时长（小时）">
        <el-input
          v-model="form.sunlightDuration"
          placeholder="请输入日照时长（小时）"
        />
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

    <PureTableBar title="地块列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          @click="handleSave"
          type="primary"
          :icon="useRenderIcon(AddFill)"
        >
          新增地块
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
import { usePlot } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "plot"
});

const formRef = ref();
const plotFormRef = ref();

const {
  form,
  close,
  loading,
  plot,
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
} = usePlot();
</script>
<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
