<template>
  <div class="shouye">
    <!-- 轮播图开始 -->
    <div class="page banner shadow">
      <el-carousel :interval="5000" height="480px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <el-image style="width: 100%; height: 100%" :src="item.image" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="title">{{ item.title }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图结束 -->

    <!-- 搜索开始 -->
    <div class="page search">
      <Search
        @search="search"
        v-model="keyword"
        position="front"
        :height="40"
        :width="420"
        searchText="快速搜索"
      ></Search>
      <span style="margin-left:30px;">关键词热搜：</span>
      <el-tag
        style="margin-left:15px;cursor:pointer;"
        @click="search(item)"
        type="success"
        effect="dark"
        v-for="(item, index) in hotWord"
        :key="index"
      >{{ item }}</el-tag>
    </div>
    <!-- 搜索结束 -->

    <div class="post">
      <!-- 寻物帖子开始 -->
      <div class="lost page">
        <Skeleton active :loading="lostloading">
          <div>
            <el-divider content-position="left" class="biaoti">最新寻物启事</el-divider>
            <div>
              <Row :space-x="15" :space-y="20">
                <Cell
                  :xs="6"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="4"
                  v-for="(item, index) in lostLists"
                  :key="index"
                >
                  <div class="card" @click="showLost(item.id)">
                    <div class="image">
                      <el-image :src="item.image ? item.image : Default" fit="fill" :z-index="1">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div>
                      <TextEllipsis
                        class="title-1"
                        :text="item.title"
                        :height="30"
                        useTooltip
                        tooltipTheme="drak"
                        placement="right"
                      >
                        <template slot="more">...</template>
                      </TextEllipsis>
                    </div>
                    <div class="msg">
                      <div>
                        <span class="primary-color">
                          <i class="el-icon-view"></i>
                          {{ item.browse }}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="primary-color">
                          <i class="el-icon-chat-dot-round"></i>
                          {{ item.comment }}
                        </span>
                      </div>
                      <div style="color:#9E9E9E;">{{ item.createTime }}</div>
                    </div>
                  </div>
                </Cell>
              </Row>
            </div>
            <div class="more">
              <div class="show-more" @click="goto(1)">
                查看更多&nbsp;&nbsp;
                <i class="el-icon-right"></i>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
      <!-- 寻物帖子结束 -->

      <div style="height:50px;"></div>

      <!-- 招领帖子开始 -->
      <div class="lost page">
        <Skeleton active :loading="lostloading">
          <div>
            <el-divider content-position="left" class="biaoti">最新招领启事</el-divider>
            <div>
              <Row :space-x="15" :space-y="20">
                <Cell
                  :xs="6"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="4"
                  v-for="(item, index) in foundLists"
                  :key="index"
                >
                  <div class="card" @click="showFound(item.id)">
                    <div class="image">
                      <el-image :src="item.image ? item.image : Default" fit="fill" :z-index="1">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div>
                      <TextEllipsis
                        class="title-1"
                        :text="item.title"
                        :height="30"
                        useTooltip
                        tooltipTheme="drak"
                        placement="right"
                      >
                        <template slot="more">...</template>
                      </TextEllipsis>
                    </div>
                    <div class="msg">
                      <div>
                        <span class="primary-color">
                          <i class="el-icon-view"></i>
                          {{ item.browse }}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="primary-color">
                          <i class="el-icon-chat-dot-round"></i>
                          {{ item.comment }}
                        </span>
                      </div>
                      <div style="color:#9E9E9E;">{{ item.createTime }}</div>
                    </div>
                  </div>
                </Cell>
              </Row>
            </div>
            <div class="more">
              <div class="show-more" @click="goto(2)">
                查看更多&nbsp;&nbsp;
                <i class="el-icon-right"></i>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
      <!-- 招领帖子结束 -->
    </div>

    <!-- 校园资讯开始 -->
    <div class="list">
      <div class="news page">
        <Row :space-x="30" :space-y="30">
          <Cell :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-divider content-position="left" class="biaoti">最新校园资讯</el-divider>
            <ul class="ul-list">
              <li class="li-item" v-for="(item, index) in newsList" :key="index">
                <div class="index">{{ index + 1 }}</div>
                <div class="news-title">
                  <TextEllipsis
                    class="title-1"
                    :text="item.title"
                    :height="40"
                    useTooltip
                    tooltipTheme="drak"
                    placement="right"
                  >
                    <template slot="more">...</template>
                  </TextEllipsis>
                </div>
                <div class="time gray-color">
                  <i class="el-icon-date"></i>
                  {{item.createTime}}
                </div>
              </li>
              <li class="li-item">
                <Button transparent>更多校园资讯</Button>
              </li>
            </ul>
          </Cell>
          <Cell :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-divider content-position="left" class="biaoti">最新网站公告</el-divider>
            <ul class="ul-list">
              <li class="li-item" v-for="(item, index) in announceList" :key="index">
                <div class="index">{{ index + 1 }}</div>
                <div class="news-title">
                  <TextEllipsis
                    class="title-1"
                    :text="item.title"
                    :height="40"
                    useTooltip
                    tooltipTheme="drak"
                    placement="right"
                  >
                    <template slot="more">...</template>
                  </TextEllipsis>
                </div>
                <div class="time gray-color">
                  <i class="el-icon-date"></i>
                  {{item.createTime}}
                </div>
              </li>
              <li class="li-item">
                <Button transparent>更多网站公告</Button>
              </li>
            </ul>
          </Cell>
        </Row>
      </div>
    </div>
    <!-- 校园资讯结束 -->
  </div>
</template>

<script>
import Default from "../../../images/default.jpg";
export default {
  name: "Shouye",
  data() {
    return {
      hotWord: ["饭卡", "学生证", "眼镜", "课本", "钱包", "手机", "身份证"],
      Default: Default,
      src: "",
      keyword: "",
      baseApi: this.$store.getters.baseApi + "/file/",
      banners: [],
      lostLists: [],
      foundLists: [],
      lostloading: true,
      foundloading: true,
      newsloading: false,
      newsList: [],
      announceList: []
    };
  },
  methods: {
    showLost(data) {
      console.log(data);
      this.$router.push({
        name: "ShowLost",
        query: { lostId: data }
      });
    },
    showFound(data) {
      this.$router.push({
        name: "ShowFound",
        query: { foundId: data }
      });
    },
    getBanners() {
      R.Banner.showToIndex().then(res => {
        console.log(res);
        if (res.ok) {
          res.body.forEach(banner => {
            let temp = {};
            temp.title = banner.title;
            temp.link = banner.link;
            temp.image = this.baseApi + banner.image;
            this.banners.push(temp);
          });
        }
      });
    },
    getLostIndex() {
      setTimeout(() => {
        R.Lost.getLostIndex().then(res => {
          console.log(res);
          if (res.ok) {
            res.body.forEach(lost => {
              let temp = {};
              temp.id = lost.id;
              temp.uuid = lost.uuid;
              temp.title = lost.title;
              if (lost.imagesName.length > 0) {
                temp.image = this.baseApi + lost.imagesName[0];
              } else {
                temp.image = null;
              }
              temp.browse = lost.browse;
              temp.comment = lost.comment;
              temp.createTime = lost.createTime;
              this.lostLists.push(temp);
            });
            this.lostloading = false;
          }
          this.lostloading = false;
        });
      }, 1000);
    },
    getFoundIndex() {
      setTimeout(() => {
        R.Found.getFoundIndex().then(res => {
          console.log(res);
          if (res.ok) {
            res.body.forEach(lost => {
              let temp = {};
              temp.id = lost.id;
              temp.uuid = lost.uuid;
              temp.title = lost.title;
              if (lost.imagesName.length > 0) {
                temp.image = this.baseApi + lost.imagesName[0];
              } else {
                temp.image = null;
              }
              temp.browse = lost.browse;
              temp.comment = lost.comment;
              temp.createTime = lost.createTime;
              this.foundLists.push(temp);
            });
            this.foundloading = false;
          }
          this.foundloading = false;
        });
      }, 1000);
    },
    getNewsList() {
      R.News.showIndex().then(res => {
        console.log(res);
        if (res.ok) {
          this.newsList = res.body;
        }
      });
    },
    getAnnounceList() {
      R.Announce.showIndex().then(res => {
        console.log(res);
        if (res.ok) {
          this.announceList = res.body;
        }
      });
    },
    search(data) {
      this.$router.push({
        name: "SearchIndex",
        params: { keyword: data }
      });
    },
    goto(index) {
      this.$router.push({
        name: "SearchIndex",
        params: { category: index }
      });
    }
  },
  mounted() {
    // 获取轮播图
    this.getBanners();
    // 获取最新寻取启事
    this.getLostIndex();
    // 获取最新招领启事
    this.getFoundIndex();
    // 获取校园资讯列表
    this.getNewsList();
    // 获取网站公告
    this.getAnnounceList();
  }
};
</script>

<style lang="less" scoped>
.shouye {
  .list {
    margin-top: 30px;
    .ul-list {
      .li-item {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
        align-items: center;
        font-weight: 500;
        margin: 5px 0px;
        .index {
          height: 20px;
          width: 20px;
          line-height: 20px;
          background-color: tomato;
          border-radius: 50%;
          font-size: 12px;
          color: white;
          text-align: center;
          margin-right: 10px;
        }
        .news-title {
          color: #34495e;
          flex: 1;
        }
        .news-title:hover {
          color: #3d7eff;
        }
        .time {
          height: 40px;
          line-height: 40px;
          width: 120px;
          text-align: right;
          font-size: 13px;
        }
      }
    }
  }
  .banner {
    margin: 30px auto !important;
    background-color: white;
    overflow: hidden;
  }
  .search {
    margin-bottom: 50px;
  }
  .el-divider__text {
    position: absolute;
    background-color: #45b984;
    color: white;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 16px;
    cursor: pointer;
  }
  .post {
    box-sizing: border-box;
    .lost {
      overflow: hidden;
      .card {
        z-index: 10;
        padding: 8px;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.5s linear;
        cursor: pointer;
        .image {
          z-index: 1;
          height: 250px;
          width: 100%;
          margin-bottom: 4px;
          overflow: hidden;
          .el-image {
            z-index: 1 !important;
            position: relative;
            display: inline-block;
            border-radius: 3px;
            height: 100%;
            transition: all 0.5s linear;
          }
        }
        .title-1 {
          width: 100%;
          font-weight: bold;
          color: #34495e;
        }
        .msg {
          margin: 5px 0px;
        }
      }
      .card:hover {
        background-color: #fff;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        opacity: 0.9;
        .el-image {
          transform: scale(1.1);
        }
      }
      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 18px 0px;
        .show-more {
          margin: 0 auto;
          display: inline-block;
          height: 40px;
          padding: 0 20px;
          font-size: 14px;
          color: #7c7c7c;
          line-height: 40px;
          text-align: center;
          border: 1px solid #3d7eff;
          border-radius: 20px;
          font-weight: bold;
          color: #3d7eff;
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .show-more:hover {
          background-color: #3d7eff;
          color: white;
        }
      }
    }
  }
}
.image-slot {
  height: 100%;
  width: 100%;
}
.h-backtop-custom {
  .h-backtop-inner {
    background-color: @primary-color;
    border-radius: 2px;
    color: @white-color;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all @transition-time ease-in-out;
    &:hover {
      background-color: lighten(@primary-color, 10%);
    }
  }
}
.el-carousel__item {
  .title {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 10px;
    left: 10px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 24px;
    color: white;
  }
}
</style>
