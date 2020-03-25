<template>
  <div class="shouye">
    <!-- 轮播图开始 -->
    <div class="page banner shadow">
      <el-carousel :interval="5000" height="480px" indicator-position="none">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <el-image style="width: 100%; height: 100%" :src="item.image" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="title">{{item.title}}</div>
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
      <span style="margin-left:30px;">热搜：</span>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">饭卡</el-tag>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">学生证</el-tag>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">眼镜</el-tag>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">课本</el-tag>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">钱包身份证</el-tag>
      <el-tag style="margin-left:15px;cursor:pointer;" type="success" effect="dark">手机</el-tag>
    </div>
    <!-- 搜索结束 -->

    <div class="post">
      <!-- 寻物帖子开始 -->
      <div class="lost page">
        <div class="title">最新寻物启事</div>
        <div>
          <Row :space-x="15" :space-y="20">
            <Skeleton active :loading="loading">
              <Cell
                :xs="6"
                :sm="6"
                :md="6"
                :lg="6"
                :xl="6"
                v-for="(item,index) in lostLists"
                :key="index"
              >
                <div class="card" @click.stop="showLost(item.id)">
                  <div class="image">
                    <el-image :src="item.image?item.image:Default" fit="cover" :z-index="1">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                  <div>
                    <TextEllipsis
                      class="title-1"
                      :text="item.title"
                      :height="50"
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
                        <i class="icon-eye"></i>
                        {{item.browse}}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="primary-color">
                        <i class="icon-volume"></i>
                        {{item.comment}}
                      </span>
                    </div>
                    <div style="color:#9E9E9E;">{{item.createTime}}</div>
                  </div>
                </div>
              </Cell>
            </Skeleton>
          </Row>
        </div>
      </div>
      <!-- 寻物帖子结束 -->

      <div style="height:30px;"></div>

      <!-- 招领帖子开始 -->
      <!-- 招领帖子结束 -->
    </div>

    <!-- 返回顶部 -->
    <BackTop :target="getTarget" :bottom="100" :right="50" class-name="h-backtop-custom">返回顶部</BackTop>
  </div>
</template>

<script>
import Default from "../../../images/default.jpg";
export default {
  name: "Shouye",
  data() {
    return {
      Default: Default,
      text: "《华盛顿自由灯塔报》几天前报道称。",
      src: "",
      keyword: "",
      baseApi: this.$store.getters.baseApi + "/file/",
      banners: [],
      lostLists: [],
      loading: true
    };
  },
  methods: {
    showLost(data) {},
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
          this.loading = false;
        }
        this.loading = false;
      });
    },
    search(data) {
      this.$Message.info(`查询“${data}”`);
    },
    getTarget() {
      return document.querySelector(".right-frame");
    }
  },
  mounted() {
    // 获取轮播图
    this.getBanners();
    // 获取最新寻取启事
    this.getLostIndex();
  }
};
</script>

<style lang="less" scoped>
.shouye {
  .banner {
    margin: 30px auto !important;
    background-color: white;
  }
  .search {
    margin-bottom: 50px;
  }
  .post {
    box-sizing: border-box;
    .lost {
      .title {
        display: inline-block;
        height: 40px;
        margin-right: 25px;
        padding: 0 20px;
        font-size: 14px;
        color: #7c7c7c;
        line-height: 40px;
        text-align: center;
        border: 1px solid #3d7eff;
        border-radius: 20px;
        font-weight: bold;
        color: #3d7eff;
        margin-bottom: 20px;
      }
      .card {
        z-index: 10;
        padding: 8px;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.5s linear;
        cursor: pointer;
        .image {
          z-index: 1;
          height: 210px;
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
  .title:hover {
    color: #409eff;
  }
}
</style>
