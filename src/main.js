import "@babel/polyfill";
import Vue from "vue";
import App from "./App";

import heyuiConfig from "js/config/heyui-config";

import router from "./router";

import store from "./store";

import "js/vue/filters";

require("./css/app.less");

import animate from "animate.css";
import "@/css/fonts/iconfont.css";

import "js/vue/components";

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

heyuiConfig();
Vue.use(HeyUI);

// const router = routerConfig();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
