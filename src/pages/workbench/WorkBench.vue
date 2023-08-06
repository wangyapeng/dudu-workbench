<template>
  <div class="left_container"></div>
  <div class="workbench_container">
    <el-row>
      <el-col
        v-for="(o, index) in 1"
        :key="o"
        :span="6"
        xs
        :offset="index > 0 ? 1 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://www.logosc.cn/img/logos/logosc.svg"
            class="image"
          />
          <div style="padding: 14px">
            <span>嘟嘟酒店系统PMS</span>
            <div class="bottom">
              <el-button type="primary" class="button" @click="jumpApp">进入应用</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from '../../store';
import { ElNotification } from 'element-plus';
const currentDate = ref(new Date());
const login = computed(() => store.state.appStore.login)

function jumpApp() {
  console.log('----> jump')
  if (!login) {
    ElNotification({
      title: '提示信息',
      message: "请您先登录",
      position: 'top-left',
    })
    return
  }
  window.open('http://192.168.0.188:3000')
}

</script>
<style>
.workbench_container{
  box-sizing: border-box;
  margin: 20px;
  padding: 20px;
  height: 100%;
  border-radius: 6px;
  margin-left: 172px;
  background-color: #f1f1f1;
}

.left_container{
  float: left;
  width: 160px;
  height: 100%;
  background-color: #00ae9d;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0 10;
  min-height: auto;
}

.image {
  width: 100%;
  height: 100px;
  display: block;
}
</style>
