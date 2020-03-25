<template>
  <div>
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容显示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../common/header.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  components: {
    Header
  }
};
</script>

<style lang="less" scoped></style>
