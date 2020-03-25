import Vue from "vue";
import VueRouter from "vue-router";
import { isAuthPage } from "js/config/menu-config";

import { getToken, removeToken } from "../js/common/auth.js";
import store from "@/store";

Vue.use(VueRouter);

// import componentsRouter from "./components-router";

const routerParam = {
  myactive: "router-link-active",
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: { name: "Home" }
    },
    {
      path: "/home",
      name: "Home",
      component: resolve => require(["../views/home/index"], resolve),
      children: [
        {
          path: "",
          name: "Shouye",
          component: resolve =>
            require(["../views/home/shouye/index"], resolve),
          meta: { title: "首页", auth: false }
        },
        {
          path: "/lostfound-search",
          name: "SearchIndex",
          component: resolve =>
            require(["../views/home/lostAndfound/search-index"], resolve),
          meta: { title: "失物招领大厅", auth: false }
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: resolve => require(["../views/login/index"], resolve),
      meta: { title: "登录", auth: false }
    },
    {
      path: "/403",
      name: "403",
      component: resolve => require(["components/error-pages/403"], resolve),
      meta: { title: "权限错误", auth: false }
    }
  ]
};

let router = new VueRouter(routerParam);

router.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " - 失物招领中心";
  } else {
    document.title = "广州大学华软软件学院失物招领中心";
  }

  if (getToken()) {
    // 获取用户信息;
    R.User.getUserInfo().then(res => {
      if (res.ok) {
        store.dispatch("updateAccount", res.body);
        store.dispatch("updateRoles", res.body.roles);
      }
    });
  }

  // 是否登录授权操作
  if (to.meta && to.meta.auth) {
    if (getToken()) {
      if (to.path == "/login") {
        next("/home");
      } else {
        next();
      }
    } else {
      next("/login");
    }
  } else {
    if (getToken()) {
      if (to.path == "/login") {
        next("/home");
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  HeyUI.$LoadingBar.success();
});

export default router;
