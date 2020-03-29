<style lang="less" scoped>
.show-box {
  margin: 40px 0px;
  .comment {
    width: 100%;
    resize: none;
    font-size: 16px;
    line-height: 20px;
  }
  .commit {
    margin: 8px 0px 15px 0px;
    display: flex;
    justify-content: space-between;
    padding: 8px 0px;
    align-items: center;
  }
  .replay {
    margin: 20px 0px;
  }
  .child {
    margin-top: 15px;
  }
  .margin {
    margin: 10px 0px;
  }
  .item {
    margin-bottom: 15px;
  }
  .rep:hover {
    color: salmon;
  }
  .push {
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.6s ease;
  }
  .push:hover {
    color: #3d7eff;
  }
}
</style>

<template>
  <div class="show-box">
    <div class="page">
      <Row :space="20">
        <Cell :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="h-panel h-panel-no-border shadow animated fadeInLeft">
            <div class="h-panel-bar">
              <div class="h-panel-title">
                <el-page-header title="返回" @back="goBack" content="寻物启事详情"></el-page-header>
              </div>
            </div>
            <div class="h-panel-body">
              <Form readonly mode="twocolumn">
                <FormItem label="标题：" single>{{lostItem.title}}</FormItem>
                <FormItem label="发布者：">{{lostItem.nickName}}</FormItem>
                <FormItem label="发布时间：">{{lostItem.createTime}}</FormItem>
                <FormItem label="物品分类：">{{lostItem.type}}</FormItem>
                <FormItem label="丢失地址：">{{lostItem.plcae}}</FormItem>
                <FormItem label="丢失时间：">{{lostItem.lostTime}}</FormItem>
                <FormItem label="详细说明：" single>{{lostItem.remark}}</FormItem>
                <FormItem label="失主姓名：">{{lostItem.name}}</FormItem>
                <FormItem label="联系电话：">{{lostItem.telephone}}</FormItem>
                <FormItem label="宿舍楼号：">{{lostItem.dorm}}</FormItem>
                <FormItem label="微信：">{{lostItem.wechat}}</FormItem>
                <FormItem label="启事状态：">
                  <span class="h-tag h-tag-bg-primary">{{lostItem.status}}</span>
                </FormItem>
                <FormItem label="浏览次数：">{{lostItem.browse}}</FormItem>
                <FormItem label="失物图片：" single>
                  <ImagePreview
                    :width="120"
                    :borderRadius="5"
                    :distance="15"
                    :datas="fileList"
                    @click="openPreview"
                  />
                </FormItem>
              </Form>
            </div>
          </div>
          <div style="margin:8px 0px;"></div>
          <div class="h-panel h-panel-no-border shadow animated fadeInUp">
            <div class="h-panel-bar">
              <span class="h-tag-circle h-tag-bg-yellow">
                <i class="h-icon-success"></i>
              </span>
              <span>评论列表</span>
            </div>
            <div class="h-panel-body">
              <Row>
                <Cell :width="24">
                  <textarea
                    v-model="comment"
                    rows="3"
                    v-autosize
                    class="comment"
                    resize="false"
                    :placeholder="placeholder"
                    ref="inputref"
                  ></textarea>
                </Cell>
              </Row>
              <div class="commit bottom-line">
                <Badge :count="count">
                  <div class="text-center">评论条数</div>
                </Badge>
                <div>
                  <Button color="yellow" @click="cancel">取消</Button>
                  <Button color="primary" @click="submitComment">发表评论</Button>
                </div>
              </div>
              <Skeleton active :loading="loading">
                <div class="list-item">
                  <div class="replay" v-for="(item,index) in commentList" :key="index">
                    <Avatar :src="item.avatar?(avatarBaseApi+item.avatar):Avatar" :imageTop="1">
                      <div style="font-size:14px;">
                        <a href="#" v-color="'#00a1d6'">{{item.fromNickName}}</a>
                      </div>
                      <div style="margin:8px 0px;line-hight:26px;">{{item.content}}</div>
                      <div style="color:#99a2aa;line-hight:24px;">
                        <span style="margin-right:30px;">
                          <i class="el-icon-date"></i>
                          {{item.createTime}}
                        </span>
                        <span
                          style="margin-right:30px;cursor: pointer;font-size:12px;"
                          @click="replay(item.userId,item.id,item.fromNickName,2)"
                        >
                          <i class="h-icon-message"></i>&nbsp;&nbsp;
                          <span class="rep">回复</span>
                        </span>
                      </div>
                      <!-- 子评论列表 -->
                      <div class="child" v-if="item.children.length>0">
                        <div class="item" v-for="(childItem,index) in item.children" :key="index">
                          <Avatar
                            :src="childItem.avatar?(avatarBaseApi+childItem.avatar):Avatar"
                            :imageTop="1"
                          >
                            <div style="font-size:14px;">
                              <a href="#" v-color="'#fb7299'">{{childItem.fromNickName}}</a>
                              <span v-if="childItem.replayId && childItem.level==3">
                                <span>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                                <a href="#" v-color="'#00a1d6'">{{childItem.toNickName}}</a>
                              </span>
                            </div>
                            <div style="margin:8px 0px;line-hight:26px;">{{childItem.content}}</div>
                            <div style="color:#99a2aa;line-hight:24px;">
                              <span style="margin-right:30px;">
                                <i class="el-icon-date"></i>
                                {{childItem.createTime}}
                              </span>
                              <span
                                style="margin-right:30px;cursor: pointer;font-size:12px;"
                                @click="replay(childItem.userId,item.id,childItem.fromNickName,3)"
                              >
                                <i class="h-icon-message"></i>&nbsp;&nbsp;
                                <span class="rep">回复</span>
                              </span>
                            </div>
                          </Avatar>
                        </div>
                        <div class="bottom-line" style="margin:10px 0px;"></div>
                      </div>
                    </Avatar>
                  </div>
                </div>
              </Skeleton>
            </div>
            <div class="h-panel-bar">
              <Pagination
                v-if="commentList.length>0"
                layout="pager"
                :cur="showDto.page"
                :total="showDto.total"
                :size="showDto.size"
                align="right"
                @change="currentChange"
              ></Pagination>
            </div>
          </div>
        </Cell>
        <Cell :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="h-panel h-panel-no-border shadow animated fadeInRight">
            <div class="h-panel-bar">
              <span class="h-panel-title">相关推荐</span>
            </div>
            <div class="h-panel-body">
              <!-- 推荐开始 -->
              <div
                class="push bottom-line"
                v-for="(item, index) in recommand"
                :key="index"
                @click="showLost(item.id)"
              >
                <Avatar :src="item.image ? item.image : Default" shape="square">
                  <div style="font-size: 18px;">
                    <TextEllipsis
                      :text="item.title"
                      :height="30"
                      useTooltip
                      tooltipTheme="drak"
                      placement="top"
                    >
                      <template slot="more">...</template>
                    </TextEllipsis>
                  </div>
                  <p class="dark2-color">{{item.createTime}}</p>
                </Avatar>
              </div>
              <!-- 推荐结束 -->
            </div>
          </div>
        </Cell>
      </Row>
    </div>
  </div>
</template>

<script>
import Default from "../../../images/default.jpg";
import Avatar from "../../../images/avatar.png";
export default {
  name: "ShowLost",
  data() {
    return {
      src: "https://i1.go2yd.com/image.php?url=0Kvq81cKR1",
      loading: true,
      count: 0,
      placeholder: "请输入您的评论.....",
      comment: "",
      Avatar: Avatar,
      Default: Default,
      fileBaseApi: this.$store.getters.baseApi + "/file/",
      avatarBaseApi: this.$store.getters.baseApi + "/avatar/",
      lostId: 0,
      iamgeList: [],
      avatar: "",
      fileList: [],
      lostItem: {},
      subComment: { type: 1, pid: 0, level: 1 },
      showDto: {
        postCode: "",
        page: 1,
        size: 4,
        total: 0
      },
      commentList: [],
      recommand: []
    };
  },
  methods: {
    showLost(data) {
      this.$router.push({
        name: "ShowLost",
        query: { lostId: data }
      });
      location.reload();
    },
    currentChange(value) {
      console.log(value);
      this.showDto.page = value.cur;
      this.showDto.size = value.size;
      // 刷新评论列表
      this.showComment();
    },
    pushLost(data) {
      R.Lost.pushLost(data).then(res => {
        console.log(res);
        if (res.ok) {
          res.body.forEach(lost => {
            let temp = {};
            temp.id = lost.id;
            temp.uuid = lost.uuid;
            temp.title = lost.title;
            if (lost.imagesName.length > 0) {
              temp.image = this.fileBaseApi + lost.imagesName[0];
            } else {
              temp.image = null;
            }
            temp.createTime = lost.createTime;
            this.recommand.push(temp);
          });
        }
      });
    },
    cancel() {
      this.subComment = { type: 1, pid: 0, level: 1 };
      this.subComment.postCode = this.lostItem.uuid;

      this.comment = "";
      this.placeholder = "请输入您的评论.....";
    },
    replay(replayId, pid, name, level) {
      this.placeholder = "回复@//" + name + ".......";
      this.$refs.inputref.focus();
      // 参数1：被回复者ID，参数2：父ID，level：表示2不显示楼主
      this.subComment.replayId = replayId;
      this.subComment.pid = pid;
      this.subComment.level = level;
      console.log(this.subComment);
    },
    showComment() {
      this.loading = true;
      R.Comment.showComment(this.showDto).then(res => {
        console.log(res);
        if (res.ok) {
          this.commentList = res.body.list; // 评论列表

          this.showDto.page = res.body.page;
          this.showDto.size = res.body.size;
          this.showDto.total = res.body.total;

          this.loading = false;
        }
      });
      this.loading = false;
    },
    submitComment() {
      if (this.comment == "") {
        this.$Notice({
          type: "warn",
          title: "温馨提示",
          content: "评论内容不允许为空"
        });
        return;
      }
      console.log(this.subComment);

      this.subComment.content = this.comment;

      R.Comment.submitComment(this.subComment).then(res => {
        console.log(res);
        if (res.ok) {
          this.$Notice({
            type: "success",
            content: "感谢您宝贵的评论"
          });

          this.subComment = { type: 1, pid: 0, level: 1 };
          this.subComment.postCode = this.lostItem.uuid;

          this.comment = "";
          this.placeholder = "请输入您的评论.....";

          // 刷新评论列表
          this.showComment();
        }
      });
    },
    openPreview(index = 0, data) {
      this.$ImagePreview(this.fileList, index);
    },
    goBack() {
      console.log("go back");
      this.$router.go(-1);
    },
    showInfoLost() {
      R.Lost.getLostInfo(this.lostId).then(res => {
        console.log(res);
        if (res.ok) {
          this.lostItem = res.body;

          this.avatar = this.lostItem.avatar
            ? this.avatarBaseApi + this.lostItem.avatar
            : this.Avatar;

          if (this.lostItem.imagesName.length > 0) {
            this.lostItem.imagesName.forEach(element => {
              this.fileList.push(this.fileBaseApi + element);
            });
          }

          // 初始化评论对象
          this.subComment.postCode = this.lostItem.uuid;
          this.showDto.postCode = this.lostItem.uuid;

          // 评论列表
          this.showComment();

          // 相关推荐
          this.pushLost({ name: this.lostItem.type, slfe: this.lostItem.id });
        }
      });
    }
  },
  mounted() {
    let tempId = this.$route.query.lostId;
    if (tempId) this.lostId = tempId;

    console.log(this.lostId);

    this.showInfoLost();
  }
};
</script>