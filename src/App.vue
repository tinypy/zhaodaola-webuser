<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import store from "./store";

export default {
  data() {
    return {};
  },
  store,
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.router-link-active {
  color: #3d7eff;
  font-weight: bold;
  border-bottom: 2px solid #3d7eff;
  box-sizing: border-box;
}
</style>
