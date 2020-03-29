<template>
  <div class="announce">
    <div class="page">
      <div class="h-panel h-panel-no-border shadow">
        <div class="h-panel-bar">
          <span class="h-panel-title">
            <el-page-header @back="goBack" content="网站公告详情"></el-page-header>
          </span>
          <span class="h-panel-right">
            <a>发布日期：{{announce.createTime}}</a>
          </span>
        </div>
        <div class="h-panel-body">
          <div class="title">
            <h4>{{announce.title}}</h4>
          </div>
          <div>
            <div v-html="announce.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnounceInfo",
  data() {
    return {
      announceId: 0,
      announce: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showAnnounceInfo() {
      R.Announce.showOne(this.announceId).then(res => {
        console.log(res);
        if (res.ok) {
          this.announce = res.body;
        }
      });
    }
  },
  mounted() {
    let tempId = this.$route.query.announceId;
    if (tempId) {
      this.announceId = tempId;
    } else {
      return;
    }

    console.log(this.announceId);

    this.showAnnounceInfo();
  }
};
</script>

<style lang="less" scoped>
.announce {
  margin: 50px 0px;
  .title {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 20px;
  }
}
</style>