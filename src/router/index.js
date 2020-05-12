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
          path: "lostfound-search",
          name: "SearchIndex",
          component: resolve =>
            require(["../views/home/lostAndfound/search-index"], resolve),
          meta: { title: "失物招领大厅", auth: false }
        },
        {
          path: "show-lost",
          name: "ShowLost",
          component: resolve =>
            require(["../views/home/lostAndfound/show-lost"], resolve),
          meta: { title: "寻物启事详情查看", auth: true }
        },
        {
          path: "show-found",
          name: "ShowFound",
          component: resolve =>
            require(["../views/home/lostAndfound/show-found"], resolve),
          meta: { title: "招领启事详情查看", auth: true }
        },
        {
          path: "announce-list",
          name: "SystemAnnounce",
          component: resolve =>
            require(["../views/home/announce/announce"], resolve),
          meta: { title: "网站公告专栏", auth: false }
        },
        {
          path: "announce-info",
          name: "AnnounceInfo",
          component: resolve =>
            require(["../views/home/announce/announce-info"], resolve),
          meta: { title: "网站公告详情", auth: false }
        },
        {
          path: "news-list",
          name: "News",
          component: resolve => require(["../views/home/news/news"], resolve),
          meta: { title: "校园资讯专栏", auth: false }
        },
        {
          path: "news-info",
          name: "NewsInfo",
          component: resolve =>
            require(["../views/home/news/news-info"], resolve),
          meta: { title: "校园资讯详情", auth: false }
        },
        {
          path: "success-case",
          name: "SuccessCase",
          component: resolve =>
            require(["../views/home/lostAndfound/success-case"], resolve),
          meta: { title: "失物招领成功案例", auth: false }
        },
        {
          path: "thanks",
          name: "Thanks",
          component: resolve =>
            require(["../views/home/thanks/thanks"], resolve),
          meta: { title: "感谢留言", auth: true }
        },
        {
          path: "about",
          name: "About",
          component: resolve => require(["../views/home/about/about"], resolve),
          meta: { title: "关于我们", auth: false }
        },
        {
          path: "pulibsh-post",
          name: "LostPublish",
          component: resolve => require(["../views/user/register"], resolve),
          meta: { title: "失物招领启事登记", auth: true },
          children: [
            {
              path: "lost-publish",
              name: "LostPublish",
              component: resolve =>
                require(["../views/user/register/lost-publish"], resolve),
              meta: { title: "寻物启事登记", auth: true }
            },
            {
              path: "found-publish",
              name: "FoundPublish",
              component: resolve =>
                require(["../views/user/register/found-publish"], resolve),
              meta: { title: "招领启事登记", auth: true }
            }
          ]
        },
        {
          path: "user-center",
          name: "User",
          component: resolve => require(["../views/user/user"], resolve),
          meta: { title: "个人中心", auth: true },
          children: [
            {
              path: "",
              name: "MyLost",
              component: resolve =>
                require(["../views/user/nav/my-lost"], resolve),
              meta: { title: "我丢失的物品", auth: true }
            },
            {
              path: "my-found",
              name: "MyFound",
              component: resolve =>
                require(["../views/user/nav/my-found"], resolve),
              meta: { title: "我拾到的物品", auth: true }
            },
            {
              path: "lost-editor",
              name: "LostEditor",
              component: resolve =>
                require(["../views/home/lostAndfound/lost-editor"], resolve),
              meta: { title: "寻物启事修改", auth: true }
            },
            {
              path: "found-editor",
              name: "FoundEditor",
              component: resolve =>
                require(["../views/home/lostAndfound/found-editor"], resolve),
              meta: { title: "招领启事修改", auth: true }
            },
            {
              path: "my-comment",
              name: "MyComment",
              component: resolve =>
                require(["../views/user/nav/my-comment"], resolve),
              meta: { title: "回复我的评论", auth: true }
            }
          ]
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

  // 是否登录授权操作
  if (to.meta && to.meta.auth) {
    if (getToken()) {
      // 获取用户信息;
      R.User.getUserInfo().then(res => {
        if (res.ok) {
          store.dispatch("updateAccount", res.body);
          store.dispatch("updateRoles", res.body.roles);
        } else {
          HeyUI.$Modal({
            title: "温馨提示",
            content: "请登录系统再操作"
          });
          removeToken();
          next("/login");
        }
      });
    }
    if (getToken()) {
      if (to.path == "/login") {
        HeyUI.$Modal({
          title: "温馨提示",
          content: "请登录系统再操作"
        });
        next("/home");
      } else {
        next();
      }
    } else {
      HeyUI.$Modal({
        title: "温馨提示",
        content: "请登录系统再操作"
      });
      removeToken();
      next("/login");
    }
  } else {
    if (getToken()) {
      // 获取用户信息;
      R.User.getUserInfo().then(res => {
        if (res.ok) {
          store.dispatch("updateAccount", res.body);
          store.dispatch("updateRoles", res.body.roles);
        } else {
          removeToken();
          next("/login");
        }
      });
      if (to.path == "/login") {
        next("/home");
      } else {
        next();
      }
    } else {
      next();
    }
  }
  next();
});

router.afterEach(() => {
  HeyUI.$LoadingBar.success();
});

export default router;
