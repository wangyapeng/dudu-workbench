<template>
  <el-dialog
    v-model="visible"
    :show-close="true"
    :modal="true"
    :append-to-body="true"
    @close="closeDialog"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">登录</h4>
      </div>
    </template>
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入合法的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.email"  />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="dynamicValidateForm.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
        <el-button @click="cancel(formRef)">取消</el-button>
        <!-- <el-button @click="resetForm(formRef)">重置</el-button> -->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import axios from "axios";
import { serverUrl } from "../../config";
import store from '../../store'
import httpContext from '../../api/httpContext'
const instance = {};
const formRef = ref(instance);
const props = defineProps(["visible"]);
var visible = ref(props.visible);
var dynamicValidateForm = reactive({
  email: "qwqe@163.com",
  password: "123456",
});
onMounted(() => {});

watch(props, async (newVal, oldVal) => {
  visible = newVal.visible;
});

const emits = defineEmits(["close",'cb']);

function closeDialog() {
  emits("close", false);
}

function submitForm(instance) {
  instance.validate(async (valid) => {
    if (valid) {
      await requestServer();
    } else {
      console.log("error submit!");
      return false;
    }
  });
}

function cancel() {
  emits('close', false);
}

async function requestServer() {
  const res = await axios.post(`/api/auth/login`, {
    email: dynamicValidateForm.email,
    password: dynamicValidateForm.password,
  });
  const {data: {token, refreshToken, name, id}} = res;
  if (token) {
    httpContext.init({token, refreshToken});
    await store.dispatch('updateUserInfo', {id, name});
    await store.dispatch('setLoginStatus',true)
    emits('close', false)
    emits('cb', false)
  }
}
</script>

<style lang="less" scoped>
.my-header {
  padding-left: 100px;
  height: 20px;
}
</style>