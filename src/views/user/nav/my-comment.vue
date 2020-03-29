<template>
  <div class="comment-msg">
    <div class="item" v-for="(item, index) in commentMsg" :key="index">
      <Avatar :src="item.fromAvatar?item.fromAvatar:Avatar" :width="50" :imageTop="5">
        <div class="text-ellipsis">
          <span style="font-weight: bold;">{{item.fromNickName}}</span>&nbsp;&nbsp;&nbsp;
          <span style="gray-color">回复了我的评论</span>&nbsp;&nbsp;&nbsp;
          <span class="red-color" v-show="item.status==1">new</span>
        </div>
        <div style="font-size: 22px;padding: 10px 0px;" class="dark1-color">{{item.content}}</div>
        <div class="blue-color">来源：{{item.portTitle}}</div>
        <div style="    margin: 6px 0px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;">
          <div>
            {{item.createTime}}&nbsp;&nbsp;&nbsp;
            <span v-if="item.commentType==1">寻物启事</span>
            <span v-if="item.commentType==2">招领启事</span>
          </div>
          <span class="delete">
            <Poptip content="确认删除?" @confirm="deleteMsg(item.id)">
              <button class="h-btn h-btn-text-primary h-btn-no-border">
                <i class="h-icon-trash"></i>
              </button>
            </Poptip>
          </span>
        </div>
        <div style="height:1px;width:100%;background: #c0c4cc;margin-bottom: 30px;"></div>
      </Avatar>
    </div>
    <div>
      <Pagination
        layout="pager,total"
        :cur="search.page"
        :total="search.total"
        :size="search.size"
        align="right"
        @change="currentChange"
        v-if="commentMsg.length > 0"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Avatar from "../../../images/avatar.png";
export default {
  name: "MyComment",
  data() {
    return {
      src: "https://i1.go2yd.com/image.php?url=0Kvq81cKR1",
      username: this.$store.state.User.username,
      search: {
        username: "",
        category: 2,
        status: 0,
        page: 1,
        size: 6,
        total: 0
      },
      Avatar: Avatar,
      baseApi: this.$store.getters.baseApi + "/avatar/",
      commentMsg: []
    };
  },
  methods: {
    setMsgread() {
      R.Message.setMsgread(2).then(res => {
        console.log(res);
      });
    },
    deleteMsg(data) {
      R.Message.delete(data).then(res => {
        console.log(res);
        if (res.ok) {
          this.getMessage();
        }
      });
    },
    currentChange(value) {
      console.log(value);
      this.showDto.page = value.cur;
      this.showDto.size = value.size;
      // 刷新评论
      this, getMessage();
    },
    getMessage() {
      this.search.username = this.username;
      this.commentMsg = [];
      R.Message.getMessage(this.search).then(res => {
        console.log(res);
        if (res.ok) {
          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;

          res.body.list.forEach(msg => {
            let temp = msg;
            if (msg.fromAvatar) {
              temp.fromAvatar = this.baseApi + msg.fromAvatar;
            }
            this.commentMsg.push(temp);
          });

          console.log(this.commentMsg);
        }
      });
    }
  },
  mounted() {
    this.setMsgread();
    this.getMessage();
  }
};
</script>

<style lang="less" scoped>
.delete:hover {
  color: tomato;
  cursor: pointer;
}
</style>