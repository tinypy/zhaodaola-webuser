<template>
  <div>
    <div class="nav-header">
      <div class="page nav">
        <div class="nav-left">
          <div class="logo">
            广大华软学院失物招领中心
          </div>
          <ul>
            <router-link to="/home" tag="li">首 页</router-link>
            <li>失物招领大厅</li>
            <li>校园资讯</li>
            <li>成功案例</li>
            <li>联系我们</li>
            <li>留言墙</li>
          </ul>
        </div>
        <div class="nav-right">
          <div class="login" v-if="display == 1">
            <router-link to="/login" tag="span">
              <i class="el-icon-user-solid"></i>
              登 录
            </router-link>
          </div>
          <div v-else>
            <DropdownMenu
              className="app-header-dropdown"
              trigger="hover"
              offset="0,5"
              :width="150"
              placement="bottom-end"
              :datas="infoMenu"
              @onclick="trigger"
            >
              <Avatar
                :src="
                  User.avatar
                    ? $store.state.baseApi + '/avatar/' + User.avatar
                    : Avatar
                "
                :width="30"
              >
                <span>{{ User.username }}</span>
              </Avatar>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getToken, removeToken } from "js/common/auth.js";
import Avatar from "@/images/avatar.png";
export default {
  name: "Header",
  data() {
    return {
      display: 1,
      infoMenu: [
        { key: "info", title: "个人信息", icon: "h-icon-user" },
        { key: "logout", title: "退出登录", icon: "h-icon-outbox" }
      ]
    };
  },
  computed: {
    ...mapState(["User"])
  },
  methods: {
    trigger(data) {
      if (data == "logout") {
        removeToken();
        this.$router.replace({ name: "Login" });
      } else {
        this.$router.push({ name: "UserCenter" });
      }
    }
  },
  mounted() {
    if (getToken()) {
      this.display = 2;
    } else {
      this.display = 1;
    }
  }
};
</script>

<style lang="less">
.nav-header {
  background-color: #fff;
  position: relative;
  .nav {
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .logo {
        width: 300px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #3d7eff;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }
      ul {
        margin-left: 10px;
        display: flex;
        width: 560px;
      }
      ul > li {
        font-weight: 500;
        text-align: center;
        flex: 1;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      ul > li:hover {
        box-sizing: border-box;
        color: #3d7eff;
      }
    }
    .nav-right {
      .login {
        font-size: 18px;
        font-weight: bolder;
        color: #3d7eff;
        width: 80px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
      }
      .app-header-dropdown {
        font-weight: bold;
        &-dropdown-container .h-dropdown-inner {
          .h-dropdowncustom-group {
            background: red;
            color: #fff;
            border-radius: 10px;
          }
        }
        cursor: pointer;
        .h-avatar-info {
          padding-left: 45px;
          min-height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
