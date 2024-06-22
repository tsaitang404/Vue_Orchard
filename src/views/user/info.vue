<template>
  <div class="main">
    <el-form
      class="bg-bg_color w-[99/100] pl-8 pt-4"
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
import { updateApi } from "@/api/user";
import { message } from "@/utils/message";
defineOptions({
  name: "Info"
});
const user = useUserStoreHook().currentUser;
const uploadStyle = { width: "175px", height: "175px", borderRadius: "50%" };
const submitForm = async () => {
  await updateApi(user);
  message("修改成功", { type: "success" });
  useUserStoreHook().logOut();
};
</script>
