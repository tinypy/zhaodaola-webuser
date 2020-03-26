<template>
  <div class="frame-box">
    <!-- 头部 -->
    <div class="header">
      <Header></Header>
    </div>

    <!-- 内容显示区域 -->
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <!-- 底部开始 -->
    <div class="footer">
      <div class="footer-box page">
        <div>
          <ul
            style="display: flex;justify-content: space-between;height: 30px;align-items: center;margin-bottom: 10px;"
          >
            <li>友情链接：</li>
            <li>
              <a href="http://home.sise.cn/" target="blank">华软导航</a>
            </li>
            <li>
              <a href="https://www.sise.com.cn/" target="blank"
                >广州大学华软软件学院</a
              >
            </li>
            <li>
              <a href="http://www.cswzl.com/" target="blank">中国失物招领网</a>
            </li>
            <li>
              <a href="https://www.diunal.com/" target="blank">丢哪了</a>
            </li>
            <li>
              <a href="http://www.swzl.com/" target="blank">失物招领网</a>
            </li>
            <li>
              <a href="https://www.shiwurenling.com/" target="blank"
                >失物认领</a
              >
            </li>
          </ul>
        </div>
        <div style="text-align:center;">
          Copyright © 2019 PangYi -
          <a href="https://www.sise.com.cn/">ZhaoDaoLa-SISE&LostAdnFound</a>
        </div>
      </div>
    </div>
    <!-- 底部结束 -->

    <!-- 返回顶部 -->
    <BackTop
      :target="getTarget"
      :bottom="100"
      :right="50"
      class-name="h-backtop-custom"
      >返回顶部</BackTop
    >
    <!-- 返回顶部 -->
  </div>
</template>

<script>
import Header from "../common/header.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    getTarget() {
      return document.querySelector(".right-frame");
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
.frame-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 60px;
  }
  .container {
    flex: 1;
  }
  .footer {
    height: 141px;
    margin-top: 40px;
    background-color: white;
    width: 100%;
    .footer-box {
      background-color: white;
      padding: 40px 0px;
      box-sizing: border-box;
    }
  }
}
</style>
