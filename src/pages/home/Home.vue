<template>
  <div class="home_page">
      home
  </div>
</template>
<script scoped>
import { defineComponent } from "vue";
import Login from "./ViewLogin.vue";
import axios from "../../api";
import store from "../../store";
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
  },
  methods: {
    jumpLoginPage() {
      if (this.$data.login) return
      this.$data.loginVisible = true;
    },
    async requestUserInfo() {
      const id = store.state.userStore.userInfo.id || null;
      const ret = await axios.post(`/api/auth/getUserInfo`, { id });
      await store.dispatch("updateUserInfo", ret.data)
      await store.dispatch('setLoginStatus',true)
    },
    closeLoginView() {
      this.$data.loginVisible = false;
      // const rediredctURL = window.location.search.split('=')[1];
      // window.location.replace(rediredctURL)
    },
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
  float: right;
  vertical-align: middle;
  line-height: 80px;
  color: #999;
  cursor: pointer;
}
</style>
