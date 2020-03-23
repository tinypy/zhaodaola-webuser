import Vue from "vue";
import VueRouter from "vue-router";
import { isAuthPage } from "js/config/menu-config";

import { getToken, removeToken } from "../js/common/auth.js";
import store from "@/store";

Vue.use(VueRouter);

// import componentsRouter from "./components-router";

const routerParam = {
  mode: "history",
  routes: [
    {
      path: "/403",
      name: "403",
      component: resolve => require(["components/error-pages/403"], resolve),
      meta: { title: "权限错误" }
    },
    {
      path: "/404",
      name: "404",
      component: resolve => require(["components/error-pages/404"], resolve),
      meta: { title: "访问页面不存在" }
    }
  ]
};

let router = new VueRouter(routerParam);

const whiteList = ["/login", "/403"];

router.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (getToken()) {
    // 已是登陆
    if (to.path == "/login") {
      next("/");
    }

    // 权限验证
    R.Menu.menus().then(res => {
      if (res.ok) {
        console.log(res.body);
        let menus = res.body || [];
        G.set("SYS_MENUS", menus);
        G.trigger("SYS_MENU_UPDATE");
        if (!isAuthPage(to.name)) {
          removeToken();
          next({ name: "403" });
          return;
        }
      }
    });

    // 获取用户信息;
    R.User.getUserInfo()
      .then(res => {
        if (res.ok) {
          store.dispatch("updateAccount", res.body);
          store.dispatch("updateRoles", res.body.roles);
        } else {
          removeToken();
          next("/login");
        }
      })
      .catch(error => {
        removeToken();
        location.reload();
      });

    if (to.meta && to.meta.title) {
      document.title = to.meta.title + " - 失物招领中心";
    } else {
      document.title = "失物招领中心";
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  HeyUI.$LoadingBar.success();
});

export default router;
