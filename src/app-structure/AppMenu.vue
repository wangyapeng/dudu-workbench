<template>
    <div class="home_header">
      <div class="home_header_content">
        <div class="logo">
          <img
            class="login_img"
            src="https://www.logosc.cn/img/logos/logosc.svg"
          />
        </div>
        <ul class="menu">
          <li class="item" @click="() => this.$router.push('/')">首页</li>
          <li class="item">产品</li>
          <li class="item">关于我们</li>
          <li class="item" @click="jumpWorkBench">工作台</li>
        </ul>
        <div class="loginInfo" @click="jumpLoginPage">
          <el-dropdown v-if="login">
            <span class="el-dropdown-link">
              {{name ? `${name}`: `${email}`}}
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>账号设置</el-dropdown-item>
                <el-dropdown-item>切换账号</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span v-else>未登录</span>
        </div>
      </div>
    </div>
  <Login
    :visible="loginVisible"
    @close="closeLoginView"
    @cb="requestUserInfo"
  />
</template>
<script scoped>
import { defineComponent } from "vue";
import { ArrowDown } from '@element-plus/icons-vue';
import Login from "../pages/home/ViewLogin.vue";
import axios from "../api";
import store from "../store";
import httpContext from "../api/httpContext";
export default defineComponent({
  components: {
    Login,
  },
  setup() {
    return {
    };
  },
  data() {
    return {
      loginVisible: false,
      // email: "",
      // name: "",
    };
  },
  computed: {
    login: () => {
      console.log("---> computed")
      return store.state.appStore.login
    },
    email: () => store.state.userStore.userInfo.email,
    name: () => store.state.userStore.userInfo.name,
  },
  mounted: async function() {
    if (!store.state.appStore.login) {
      await this.requestUserInfo()
    }
  },
  methods: {
    jumpLoginPage() {
      if (this.$data.login) return
      this.$data.loginVisible = true;
    },
    async requestUserInfo() {
      try {
        const id = store.state.userStore.userInfo.id || null;
        const ret = await axios.post(`/api/auth/getUserInfo`, { id });
        await store.dispatch("updateUserInfo", ret.data)
        await store.dispatch('setLoginStatus',true)
      } catch(e) {
        console.error(e.message);
      }
    },
    jumpWorkBench() {
      this.$router.push('/work-bench')
    },
    closeLoginView() {
      this.$data.loginVisible = false;
      // const rediredctURL = window.location.search.split('=')[1];
      // window.location.replace(rediredctURL)
    },
    async logout() {
      httpContext.clearToken();
      await store.dispatch('clearLogin',false);
      await store.dispatch('logout',false)
    }
  },
});
</script>

<style lang="less" scoped>
.name {
  color: red;
}
ul,
ol {
  list-style-type: none;
}

.app_page {
  background-color: #fff;
  height: 100%;
  width: auto;
  overflow: auto;
  box-sizing: border-box;
}
.home_header {
  display: flex;
  height: 60px;
  gap: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: center;
}

.home_header_content {
  width: 1000px;
  display: flex;
}

.place {
  flex: 1 1 0;
  border-radius: 6px;
  background-color: #f1f1f1;
}

.title {
  color: #333;
}

.footer_container {
  height: 300px;
  margin-top: 12px;
  display: flex;
  gap: 12px;
}

.footer_box {
  flex: 1;
  background-color: #f1f1f1;
  border-radius: 6px;
}

.logo {
  display: flex;
  align-items: center;
}
.login_img {
  width: 100px;
}

.menu {
  display: flex;
  flex: 1;
  align-items: center;
}
.item {
  width: 100px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: #65c294;
  }
}

.loginInfo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
