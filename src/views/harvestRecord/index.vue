<template>
  <div class="main">
    <el-dialog
      @close="close"
      top="10vh"
      :title="dialogTitle"
      v-model="isShowDialog"
    >
      <el-form
        ref="harvestRecordFormRef"
        :model="harvestRecord"
        label-width="100px"
      >
        <el-form-item prop="plotId" label="地块">
          <el-select v-model="harvestRecord.plotId" placeholder="请选择地块">
            <el-option
              v-for="item in plotList"
              :key="item.id"
              :label="item.location"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="treeId" label="果树">
          <el-select v-model="harvestRecord.treeId" placeholder="请选择地块">
            <el-option
              v-for="item in treeList"
              :key="item.id"
              :label="item.species"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="harvestDate" label="采摘日期">
          <el-input
            v-model="harvestRecord.harvestDate"
            placeholder="请输入采摘日期"
          />
        </el-form-item>
        <el-form-item prop="yield" label="产量">
          <el-input
            v-model="harvestRecord.yield"
            placeholder="请输入产量（公斤）"
          />
        </el-form-item>
        <el-form-item prop="quality" label="水果品质">
          <el-input
            v-model="harvestRecord.quality"
            placeholder="请输入水果品质（如A级、B级等）"
          />
        </el-form-item>
        <el-form-item prop="salesDestination" label="销售去向">
          <el-input
            v-model="harvestRecord.salesDestination"
            placeholder="请输入销售去向"
          />
        </el-form-item>
        <el-form-item prop="pricePerKg" label="每公斤价格">
          <el-input
            v-model="harvestRecord.pricePerKg"
            placeholder="请输入每公斤价格（元）"
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
      <el-form-item prop="harvestDate" label="采摘日期">
        <el-input v-model="form.harvestDate" placeholder="请输入采摘日期" />
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

    <PureTableBar title="采摘记录列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          @click="handleSave"
          type="primary"
          :icon="useRenderIcon(AddFill)"
        >
          新增采摘记录
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
import { onMounted, ref } from "vue";
import { useHarvestRecord } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

import AddFill from "@iconify-icons/ri/add-circle-line";
import { findAllPlot } from "@/api/plot";
import { findAllTree } from "@/api/tree";

defineOptions({
  name: "harvestRecord"
});

const formRef = ref();
const harvestRecordFormRef = ref();
const plotList = ref([]);
const treeList = ref([]);
onMounted(async () => {
  const res = await findAllPlot();
  plotList.value = res.data;
  const res1 = await findAllTree();
  treeList.value = res1.data;
});
const {
  form,
  close,
  loading,
  harvestRecord,
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
} = useHarvestRecord();
</script>
<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
