<script>
import { reactive, ref, computed } from 'vue'
import 'element-plus/dist/index.css'
import AppMenu from './app-structure/AppMenu.vue'
export default {
  components: {
    AppMenu
  },
  setup() {
    return {}
  },

  mounted() {
  },
}
</script>
<style scoped>
body{
  background-color: antiquewhite;
}
.app-container{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

}
.left{
    float: left;
    width: auto;
    height: 100%;
  }

.right-container{
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>

<template>
  <div class="app-container">
    <AppMenu />
    <section class="right-container">
      <router-view></router-view>
    </section>
  </div>
</template>