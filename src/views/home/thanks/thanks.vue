<style lang="less" scoped>
.thanks-box {
  margin: 40px 0px;
  .comment {
    width: 100%;
    resize: none;
  }
  .item {
    margin-bottom: 30px;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="thanks-box">
    <div class="page">
      <h2>拾金不昧，手有余香</h2>
      <div style="height:5px;"></div>
      <h3>请写下你想对那个他（她）的感谢吧!</h3>
      <div style="height:15px;"></div>
      <Row :space="50">
        <!-- 留言开始 -->
        <Cell :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <Form
            :label-width="110"
            mode="block"
            :model="thanks"
            :rules="validationRules"
            ref="form"
            :top="0.2"
          >
            <FormItem label="标 题" prop="title">
              <input
                type="text"
                v-model="thanks.title"
                placeholder="请输入一个标题吧，限制输入30个字哦"
                v-wordlimit="30"
              />
            </FormItem>
            <FormItem label="留言内容" prop="content">
              <textarea
                placeholder="写点内容吧"
                class="comment"
                rows="4"
                v-autosize
                v-wordcount="60"
                v-model="thanks.content"
                resize="false"
              ></textarea>
            </FormItem>
            <FormItem>
              <Button @click="createThanks" color="primary" :loading="isLoading">提 交</Button>
            </FormItem>
          </Form>
        </Cell>
        <!-- 留言结束 -->

        <!-- 列表开始-->
        <Cell :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <Skeleton active :loading="loading">
            <div class="item" v-for="(item, index) in thanksList" :key="index">
              <Avatar :src="item.avatar?item.avatar:Avatar" :width="60" :imageTop="5">
                <div style="font-size: 20px;" class="text-ellipsis">{{item.nickName}}</div>
                <p class="dark1-color">{{item.title}}</p>
                <p class="bg-gray1-color" style="padding: 8px;border-radius: 5px;">{{item.content}}</p>
                <p class="dark2-color">留言时间：{{item.createTime}}</p>
              </Avatar>
            </div>
          </Skeleton>
          <div class="item">
            <Pagination
              v-if="thanksList.length>0"
              layout="pager,total"
              :cur="search.page"
              :total="search.total"
              :size="search.size"
              align="left"
              @change="currentChange"
            ></Pagination>
          </div>
        </Cell>
        <!-- 列表结束 -->
      </Row>
    </div>
  </div>
</template>

<script>
import Avatar from "../../../images/avatar.png";
export default {
  name: "Thanks",
  data() {
    return {
      loading: false,
      isLoading: false,
      validationRules: { required: ["title", "content"] },
      thanks: {
        title: "",
        content: ""
      },
      Avatar: Avatar,
      baseApi: this.$store.getters.baseApi + "/avatar/",
      thanksList: [],
      search: {
        page: 1,
        size: 6,
        total: 0
      }
    };
  },
  methods: {
    currentChange(value) {
      this.search.page = value.cur;
      this.search.size = value.size;
      ths.getThanks();
    },
    createThanks() {
      this.isLoading = true;
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Thanks.createThanks(this.thanks).then(res => {
          console.log(res);
          if (res.ok) {
            this.$Notice({
              type: "success",
              content: "感谢您宝贵的留言"
            });
            this.isLoading = false;
            this.thanks = { title: "", content: "" };

            this.search = {
              page: 1,
              size: 6,
              total: 0
            };
            this.getThanks();
          }
        });
      }
      this.isLoading = false;
    },
    getThanks() {
      this.loading = true;
      R.Thanks.getThanks(this.search).then(res => {
        console.log(res);
        if (res.ok) {
          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;

          res.body.list.forEach(thanks => {
            let temp = thanks;
            if (thanks.avatar) {
              temp.avatar = this.baseApi + thanks.avatar;
            }
            this.thanksList.push(temp);
            this.loading = false;
          });
        }
      });
      this.loading = false;
    }
  },
  mounted() {
    this.getThanks();
  }
};
</script>