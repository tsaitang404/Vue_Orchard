<template>
  <el-dialog top="10vh" title="充值金额" v-model="isShowDialog">
    <el-form ref="customerFormRef" :model="params" label-width="80px">
      <el-form-item prop="money" label="充值金额">
        <el-input v-model="params.money" placeholder="请输入充值金额" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="main">
    <el-form
      class="bg-bg_color w-[99/100] pl-8 pr-8 pt-4"
      ref="userForm"
      :model="user"
      label-width="80px"
    >
      <el-form-item label="用户名">
        <el-input v-model="user.username" disabled />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" show-password />
      </el-form-item>
      <el-form-item prop="headImage" label="头像">
        <UploadImg
          id="avatar2"
          v-model:imageUrl="user.headImage"
          :uploadStyle="uploadStyle"
        >
          <template #tip> 选择图片 </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份">
        <el-input v-model="user.isVip" disabled />
      </el-form-item>
      <el-form-item label="余额">
        <el-input
          style="width: 50%; margin-right: 20px"
          v-model="user.balance"
          disabled
        />
        <el-button type="primary" @click="isShowDialog = true">充值</el-button>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="user.phone" />
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import UploadImg from "@/components/UploadImg/index.vue";
import { updateApi } from "@/api/customer";
import { message } from "@/utils/message";
import { chargeApi, getInfo } from "@/api/customer";
import { onMounted, ref } from "vue";
defineOptions({
  name: "Center"
});
const user = ref({
  id: null,
  name: null,
  age: null,
  idCard: null,
  password: null,
  phone: null,
  isVip: null,
  balance: null,
  rechargeAmount: null,
  consumptionAmount: null,
  rechargeTime: null,
  username: null,
  headImage: null,
  sex: null,
  token: null
});
const params = ref({
  id: null,
  money: 0
});
const isShowDialog = ref(false);
onMounted(async () => {
  const result = await getInfo();
  user.value = result.data;
  params.value.id = result.data.id;
});

const confirm = async () => {
  await chargeApi(params.value);
  message("充值成功", { type: "success" });
  const result = await getInfo();
  user.value = result.data;
  isShowDialog.value = false;
  params.value.money = 0;
};
const uploadStyle = { width: "175px", height: "175px", borderRadius: "50%" };
const submitForm = async () => {
  await updateApi(user.value);
  message("修改成功", { type: "success" });
  useUserStoreHook().logOut();
};
</script>
