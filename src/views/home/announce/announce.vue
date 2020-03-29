<style lang="less" scoped>
.announce {
  margin: 50px 0px;
  .el-divider__text {
    position: absolute;
    background-color: #45b984;
    color: white;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 16px;
    cursor: pointer;
  }
  .list {
    margin-top: 10px;
  }
  .bg {
    background-color: #d3d3d3;
    border-radius: 8px;
  }
  .margin {
    margin: 10px 0px;
  }
  .row {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    align-items: center;
    .title {
      flex: 1;
      padding: 0px 22px;
    }
    .time {
      width: 200px;
      text-align: center;
    }
    .browse {
      width: 180px;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="announce">
    <div class="page">
      <el-page-header title="首 页" @back="goBack" content="网站公告栏"></el-page-header>
      <div class="list">
        <div class="row bg">
          <div class="title" style="font-weight:bold;">标 题</div>
          <div class="time" style="font-weight:bold; border-left: 1px solid white;">发布时间</div>
          <div class="browse" style="font-weight:bold; border-left: 1px solid white;">浏览次数</div>
        </div>
        <div class="row margin" v-for="(item, index) in announceList" :key="index">
          <div class="title">
            <TextEllipsis
              @click="gotoInfo(item.id)"
              textClass="link"
              :text="(index+1)+'.'+item.title"
              :height="40"
              useTooltip
              tooltipTheme="drak"
              placement="right"
            >
              <template slot="more">...</template>
            </TextEllipsis>
          </div>
          <div class="time">{{item.createTime}}</div>
          <div class="browse">{{item.browse}}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:30px;">
      <Pagination
        v-if="announceList.length>0"
        layout="pager,total"
        :cur="pageDto.page"
        :total="pageDto.total"
        :size="pageDto.size"
        align="center"
        @change="currentChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemAnnounce",
  data() {
    return {
      pageDto: {
        page: 1,
        size: 10,
        total: 0
      },
      announceList: []
    };
  },
  methods: {
    gotoInfo(data) {
      this.$router.push({
        name: "AnnounceInfo",
        query: { announceId: data }
      });
    },
    currentChange(value) {
      console.log(value);
      this.pageDto.page = value.cur;
      this.pageDto.size = value.size;
      // 刷新评论列表
      this.showAnnounce();
    },
    goBack() {
      this.$router.push("/home");
    },
    showAnnounce() {
      R.Announce.showAnnounce(this.pageDto).then(res => {
        console.log(res);
        if (res.ok) {
          this.announceList = res.body.list;
          this.pageDto.page = res.body.page;
          this.pageDto.size = res.body.size;
          this.pageDto.total = res.body.total;
        }
      });
    }
  },
  mounted() {
    this.showAnnounce();
  }
};
</script>