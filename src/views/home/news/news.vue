<style lang="less" scoped>
.news-box {
  .wat {
    background: white;
    min-width: 1200px;
    .news-bg {
      width: 100%;
      height: 200px;
      background: url("../../../images/news.jpg") no-repeat center;
      background-size: cover;
      opacity: 0.9;
    }
  }

  .item {
    margin-bottom: 30px;
    cursor: pointer;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding-right: 10px;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 10px;
      .placement {
        margin-right: 10px;
      }
      .sub {
        transition: all 0.2s linear;
      }
    }
    .content {
      display: flex;
      .img {
        .el-image {
          position: relative;
          display: inline-block;
          overflow: hidden;
          width: 130px;
          height: 120px;
          margin-right: 16px;
        }
      }
      .detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .info {
          max-height: 90px;
          overflow: hidden;
          text-indent: 2em;
        }
        .time {
          height: 20px;
          margin-top: 5px;
        }
      }
    }
  }
  .item:hover .title > .sub {
    color: #3d7eff;
  }
}
</style>

<template>
  <div class="news-box">
    <div class="wat" ref="wat" id="wat">
      <div class="news-bg"></div>
    </div>

    <!-- 内容开始 -->
    <div class="page">
      <Row :space="20">
        <Cell :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="h-panel h-panel-no-border shadow">
            <div class="h-panel-bar" style="text-align: center;">
              <span class="h-panel-title blue-color">资讯分类</span>
            </div>
            <div class="h-panel-body" style="text-align: center;">
              <Tabs :datas="types" class-name="h-tabs-menu" v-model="selected" @change="change">
                <template slot-scope="{tab}" slot="item">
                  <span>{{tab.title}}</span>
                </template>
              </Tabs>
            </div>
          </div>
        </Cell>

        <Cell :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div style="padding: 20px 0px;">
            <Search placeholder="查询" v-model="search.word" v-width="300"></Search>
            <i class="h-split"></i>
            <button class="h-btn h-btn-green h-btn-m" @click="searchNews">查询</button>
          </div>
          <Loading text="Loading" :loading="loading"></Loading>
          <transition name="el-fade-in-linear">
            <div>
              <!-- 新闻Item -->
              <div
                class="item"
                v-for="(item, index) in newsList"
                :key="index"
                v-show="isShow"
                @click="goto(item.id)"
              >
                <div class="title">
                  <div class="placement h-tag h-tag-bg-red" v-if="item.placement==1">置顶</div>
                  <div class="sub">
                    <TextEllipsis
                      :text="item.title"
                      :height="40"
                      useTooltip
                      tooltipTheme="drak"
                      placement="right"
                    >
                      <template slot="more">...</template>
                    </TextEllipsis>
                  </div>
                </div>
                <div class="content">
                  <div class="img" v-if="item.image">
                    <el-image :src="item.image"></el-image>
                  </div>
                  <div class="detail">
                    <div class="info">
                      <TextEllipsis :text="item.remark" :height="90">
                        <template slot="more">...</template>
                      </TextEllipsis>
                    </div>
                    <div class="time">
                      <span class="red-color">发布日期：{{item.createTime}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        class="red-color"
                      >点击次数：{{item.browse}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <Pagination
            v-if="newsList.length>0"
            layout="pager,total"
            :cur="search.page"
            :total="search.total"
            :size="search.size"
            align="left"
            @change="currentChange"
          ></Pagination>
        </Cell>
      </Row>
    </div>
    <!-- 内容结束 -->
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      loading: true,
      isShow: true,
      baseApi: this.$store.getters.baseApi + "/file/",
      banners: [],
      selected: 0,
      search: {
        word: "",
        type: 0,
        status: 1,
        page: 1,
        size: 6,
        total: 0
      },
      types: [],
      newsList: []
    };
  },
  methods: {
    goto(data) {
      this.$router.push({ name: "NewsInfo", query: { newsId: data } });
    },
    searchNews() {
      console.log(this.search.word);

      let w = this.search.word;
      this.search = {
        word: w,
        type: this.selected,
        status: 1,
        page: 1,
        size: 6,
        total: 0
      };
      this.getNewsList();
    },
    getNewsList() {
      this.newsList = [];
      this.loading = true;
      this.search.type = this.selected;
      this.isShow = false;
      R.News.showNews(this.search).then(res => {
        console.log(res);
        if (res.ok) {
          res.body.list.forEach(news => {
            let temp = news;
            if (temp.image) {
              temp.image = this.baseApi + temp.image;
            }
            this.newsList.push(temp);
          });

          console.log(this.newsList);

          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;

          this.loading = false;
          this.isShow = true;
        }
      });
      this.loading = false;
      this.isShow = true;
    },
    getType() {
      // 物品分类
      R.NewsType.getAll().then(res => {
        if (res.ok) {
          res.body.forEach(element => {
            let temp = {};
            temp.key = element.id;
            temp.title = element.name;
            this.types.push(temp);
          });

          if (this.types.length > 0) {
            this.selected = this.types[0].key;
          }

          this.getNewsList();
        }
      });
    },
    currentChange(value) {
      this.search.page = value.cur;
      this.search.size = value.size;
      ths.getNewsList();
    },
    change(data) {
      this.selected = data.key;
      this.search = {
        word: "",
        type: this.selected,
        status: 1,
        page: 1,
        size: 6,
        total: 0
      };
      this.getNewsList();
    }
  },
  mounted() {
    this.getType();
  }
};
</script>