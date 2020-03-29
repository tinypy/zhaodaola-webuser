<template>
  <div class="box">
    <div class="page">
      <div class="h-panel h-panel-no-border shadow">
        <div class="h-panel-bar">
          <span class="h-panel-title">
            <el-page-header @back="goBack" content="校园资讯详情"></el-page-header>
          </span>
        </div>
        <div class="h-panel-body bottom-line">
          <Row :space="20">
            <Cell :width="3"></Cell>
            <Cell :width="18">
              <div class="title">
                <h4>{{newsInfo.title}}</h4>
              </div>
              <div class="news-info bottom-line">
                <div class="item">
                  <i class="icon-file-subtract"></i>
                  作者：{{newsInfo.author}}
                </div>
                <div class="item">
                  <i class="icon-tag"></i>
                  来源：{{newsInfo.dept}}
                </div>
                <div class="item">
                  <i class="icon-clock"></i>
                  发布时间：{{newsInfo.createTime}}
                </div>
                <div class="item">
                  <i class="icon-eye"></i>
                  浏览次数：{{newsInfo.browse}}
                </div>
              </div>
              <div class="news-content">
                <div v-html="newsInfo.content"></div>
              </div>
            </Cell>
            <Cell :width="3"></Cell>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsInfo",
  data() {
    return {
      newsInfo: {},
      newsId: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    let tempId = this.$route.query.newsId;
    if (tempId) {
      this.newsId = tempId;
    } else {
      return;
    }
    console.log(this.newsId);
    R.News.getOne(this.newsId).then(res => {
      console.log(res);
      if (res.ok) {
        this.newsInfo = res.body;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.box {
  margin: 40px 0px;
}
.title {
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  margin-bottom: 10px;
}
.news-info {
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
}
.news-content {
  padding: 20px 0;
  box-sizing: border-box;
}
</style>