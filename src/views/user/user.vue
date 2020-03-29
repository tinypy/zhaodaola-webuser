<style lang="less" scoped>
.user-box {
  .wat {
    background: white;
    min-width: 1200px;
    .news-bg {
      width: 100%;
      height: 220px;
      background: url("../../images/new-top.png") no-repeat center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .tt {
        height: 160px;
        .avatar {
          height: 160px;
          background: url("../../images/t_bg.png") no-repeat center top;
          background-size: 280px auto;
          position: relative;
          .img {
            height: 80px;
            position: absolute;
            width: 100%;
            bottom: 0;
            margin: 14px auto;
            text-align: center;
            display: flex;
            justify-content: center;
            padding-left: 2px;
            box-sizing: border-box;
          }
          .update-avatar {
            position: absolute;
            top: -1px;
            left: 118px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            padding: 10px;
          }
        }
        .user-nav {
          height: 160px;
          display: flex;
          flex-direction: column-reverse;
          .item-nav {
            .router-link-exact-active {
              opacity: 1;
            }
            > span {
              display: inline-block;
              height: 60px;
              line-height: 60px;
              color: white;
              font-size: 16px;
              opacity: 0.6;
              padding: 0 30px;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
            }
            > span:hover {
              opacity: 1;
            }
            > em {
              display: inline-block;
              width: 1px;
              height: 24px;
              background: rgba(255, 255, 255, 0.2);
              vertical-align: top;
              margin-top: 18px;
            }
          }
        }
      }
    }
  }

  .main {
    .box {
      background-color: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .nick {
        padding: 30px 0px;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
      }
      .user-info {
        padding-left: 0;
        list-style: none;
        padding: 0px 10px;
        li {
          border-bottom: 1px solid #f0f3f4;
          padding: 15px 0;
          font-size: 13px;
        }
        .user-right {
          float: right;
          a {
            color: #317ef3;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="user-box">
    <!-- 头部开始 -->
    <div class="wat" ref="wat" id="wat">
      <div class="news-bg">
        <!-- 头部导航开始 -->
        <div class="page tt">
          <Row :space-x="25">
            <!-- 左边 -->
            <Cell :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="avatar">
                <span class="update-avatar red-color">
                  <el-upload
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :headers="headers"
                    :action="updateAvatarApi"
                    class="avatar-uploader"
                  >
                    <span title="更换头像">上传</span>
                  </el-upload>
                </span>
                <div class="img">
                  <Avatar
                    :src="User.avatar?avatarBaseApi+User.avatar:Avatar"
                    :width="80"
                    fit="fill"
                    noInfo
                  ></Avatar>
                </div>
              </div>
            </Cell>
            <!-- 右边 -->
            <Cell :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <div class="user-nav">
                <div class="item-nav">
                  <router-link tag="span" :to="{name:'MyLost'}">我丢失的物品</router-link>
                  <em></em>
                  <router-link tag="span" :to="{name:'MyFound'}">我拾到的物品</router-link>
                  <em></em>
                  <router-link tag="span" :to="{name:'MyComment'}">
                    <Badge :count="commentCount">
                      <div class="text-center">回复我的</div>
                    </Badge>
                  </router-link>
                  <em></em>
                  <span href="#">消息通知</span>
                </div>
              </div>
            </Cell>
          </Row>
        </div>
        <!-- 头部导航结束 -->
      </div>
    </div>
    <!-- 头部结束 -->

    <!-- 主体开始 -->
    <div class="main page">
      <Row :space-x="25">
        <!-- 左边 -->
        <Cell
          :xs="6"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="6"
          style=" padding-left: 12px;padding-right: 12px;"
        >
          <div class="box">
            <div class="nick">{{userInfo.nickName}}</div>
            <div>
              <ul class="user-info">
                <li>
                  <div style="height: 100%">
                    登录账号
                    <div class="user-right">{{ userInfo.username }}</div>
                  </div>
                </li>

                <li>
                  真实姓名
                  <div class="user-right">{{ userInfo.realName }}</div>
                </li>

                <li>
                  手机号码
                  <div class="user-right">{{ userInfo.telephone }}</div>
                </li>

                <li>
                  我的邮箱
                  <div class="user-right">{{ userInfo.email }}</div>
                </li>

                <li>
                  所属部门
                  <div class="user-right">{{ userInfo.dept }}</div>
                </li>

                <li>
                  安全设置
                  <div class="user-right">
                    <a @click="editorVisible = true">信息编辑</a>
                    ｜
                    <a @click="updateVisible = true">修改密码</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Cell>
        <!-- 右边 -->
        <Cell :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div style="margin-top:20px;">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </Cell>
      </Row>
    </div>
    <!-- 主体结束 -->

    <!-- 弹窗 -->
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="updateVisible"
      width="30%"
      :modal-append-to-body="false"
      top="25vh"
      :destroy-on-close="true"
    >
      <Form ref="form" :label-width="150" :rules="rules" :model="data">
        <FormItem label="旧密码" prop="oldpassword">
          <input type="text" v-model="data.oldpassword" :autocomplete="false" />
        </FormItem>

        <FormItem label="新密码" prop="newpassword1">
          <input type="password" v-model="data.newpassword1" :autocomplete="false" />
        </FormItem>

        <FormItem label="再次输入新密码" prop="newpassword2">
          <input type="password" v-model="data.newpassword2" :autocomplete="false" />
        </FormItem>

        <FormItem>
          <Button color="primary" :loading="isLoading" @click="submit">提 交</Button>&nbsp;&nbsp;&nbsp;
          <Button @click="updateVisible = false">取 消</Button>
        </FormItem>
      </Form>
    </el-dialog>

    <el-dialog
      title="个人信息编辑"
      :close-on-click-modal="false"
      :visible.sync="editorVisible"
      width="30%"
      top="25vh"
      :destroy-on-close="true"
      :modal-append-to-body="false"
    >
      <Form
        ref="editor"
        :label-width="80"
        :showErrorTip="false"
        :rules="validationRules"
        :model="editor"
      >
        <FormItem label="昵称" prop="nickName">
          <input v-model="editor.nickName" type="text" placeholder="用户名称" required />
        </FormItem>
        <FormItem label="联系电话" prop="telephone">
          <input v-model="editor.telephone" type="text" placeholder="联系电话" />
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <input v-model="editor.email" type="text" placeholder="邮箱" />
        </FormItem>
        <FormItem>
          <Button color="primary" @click="updateUser">保 存</Button>&nbsp;&nbsp;&nbsp;
          <Button @click="editorVisible = false">取 消</Button>
        </FormItem>
      </Form>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
const api = "http://localhost:8001/api";
import { mapState } from "vuex";
import { getToken, removeToken } from "js/common/auth.js";
import Avatar from "@/images/avatar.png";
export default {
  name: "User",
  computed: {
    ...mapState(["User"])
  },
  data() {
    return {
      commentCount: 0,
      validationRules: {
        required: ["nickName", "telephone", "email"],
        email: ["email"],
        mobile: ["telephone"]
      },
      editor: {
        id: 0,
        nickName: "",
        telephone: "",
        email: ""
      },
      editorVisible: false,
      data: {
        oldpassword: null,
        newpassword1: null,
        newpassword2: null
      },
      isLoading: false,
      rules: {
        required: ["oldpassword", "newpassword1", "newpassword2"],
        combineRules: [
          {
            refs: ["newpassword1", "newpassword2"],
            valid: {
              valid: "equal",
              message: "两次输入的密码不一致"
            }
          }
        ]
      },
      updateVisible: false,
      updateAvatarApi: api + "/users/updateAvatar",
      headers: {
        Authorization: getToken()
      },
      fileBaseApi: this.$store.getters.baseApi + "/file/",
      avatarBaseApi: this.$store.getters.baseApi + "/avatar/",
      Avatar: Avatar,
      userInfo: {}
    };
  },
  methods: {
    getNoread() {
      R.Message.getNoread(2).then(res => {
        console.log(res);
        if (res.ok) {
          this.commentCount = res.body;
        }
      });
    },
    updateUser() {
      let validResult = this.$refs.editor.valid();
      if (validResult.result) {
        R.User.updateInfo(this.editor).then(res => {
          if (res.ok) {
            this.$notify({
              title: "修改成功",
              type: "success",
              duration: 2500
            });
            this.getUserInfo();
            this.editorVisible = false;
          }
        });
      }
    },
    initEditor(user) {
      let tempUser = {};
      tempUser.id = user.id;
      tempUser.nickName = user.nickName;
      tempUser.telephone = user.telephone;
      tempUser.email = user.email;
      this.editor = tempUser;
    },
    getUserInfo() {
      // 获取用户信息;
      R.User.getUserInfo().then(res => {
        if (res.ok) {
          this.userInfo = res.body;
          this.initEditor(res.body);
          store.dispatch("updateAccount", res.body);
          store.dispatch("updateRoles", res.body.roles);
        }
      });
    },
    handleSuccess(response, file, fileList) {
      this.$notify({
        title: "头像修改成功",
        type: "success",
        duration: 2500
      });
      this.getUserInfo();
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message);
      this.$notify({
        title: msg.message,
        type: "error",
        duration: 2500
      });
    },
    submit() {
      this.isLoading = true;
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let pass = {};
        pass.oldPass = this.data.oldpassword;
        pass.newPass = this.data.newpassword1;
        R.User.updatePass(pass).then(res => {
          if (res.ok) {
            this.$notify({
              title: "密码修改成功，请重新登录",
              type: "success",
              duration: 1500
            });
            setTimeout(() => {
              removeToken();
              this.$router.replace({ name: "Login" });
            }, 1500);
          }
        });
      }
      this.isLoading = false;
    }
  },
  mounted() {
    this.getNoread();
    this.getUserInfo();
  }
};
</script>