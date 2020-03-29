<template>
  <div class="search-index">
    <!-- 查询条件开始 -->
    <div class="page shadow">
      <div class="h-panel h-panel-no-border">
        <div class="h-panel-bar">
          <span class="h-panel-title">失物招领全局搜索</span>
        </div>
        <div class="h-panel-bar">
          <Search
            @search="onSearch"
            v-model="search.word"
            position="front"
            :height="40"
            :width="420"
          ></Search>
          <div class="search-picker">
            <div class="search-filter-wrap">
              <div class="search-picker-title">查询类型：</div>
              <div class="search-picker-item-group">
                <SwitchList v-model="category" :datas="categorys" @change="onchangeCategory"></SwitchList>
              </div>
            </div>
          </div>
          <div class="search-picker">
            <div class="search-filter-wrap">
              <div class="search-picker-title">物品分类：</div>
              <div class="search-picker-item-group">
                <SwitchList v-model="search.type" :datas="types" @change="onchangetype"></SwitchList>
              </div>
            </div>
          </div>
          <div class="search-picker">
            <div class="search-filter-wrap">
              <div class="search-picker-title">日期选择：</div>
              <div class="search-picker-item-group">
                <DateRangePicker
                  @clear="onClear"
                  style="width: 100%;"
                  v-model="value"
                  v-width="300"
                  placeholder="发布时间"
                  :format="format"
                  :option="param"
                  @confirm="change"
                ></DateRangePicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询条件结束 -->

    <!-- 查询结果开始 -->
    <div class="post">
      <div class="lost page animated fadeIn">
        <div>
          <el-divider content-position="left" class="biaoti">查询结果</el-divider>
          <div>
            <Row :space-x="15" :space-y="20">
              <Cell
                :xs="6"
                :sm="6"
                :md="6"
                :lg="6"
                :xl="4"
                v-for="(item, index) in searchResult"
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
        </div>
      </div>
    </div>
    <!-- 查询结果结束 -->

    <!-- 分页开始 -->
    <div class="page" v-if="searchResult.length > 0">
      <Pagination
        layout="pager"
        :cur="search.page"
        :total="search.total"
        :size="search.size"
        align="center"
        @change="currentChange"
      ></Pagination>
    </div>
    <div v-else class="page gray-color" style="text-align:center;font-size: 22px;">空空如也</div>
    <!-- 分页结束 -->
  </div>
</template>

<script>
import Default from "../../../images/default.jpg";
export default {
  name: "SearchIndex",
  data() {
    return {
      loading: false,
      Default: Default,
      baseApi: this.$store.getters.baseApi + "/file/",
      value: {},
      param: {
        end: new Date()
      },
      lostIds: [],
      format: "YYYY-MM-DD",
      category: 1,
      search: {
        word: "",
        type: 0,
        status: 1,
        start: "",
        end: "",
        page: 1,
        size: 12,
        total: 0
      },
      searchResult: [],
      categorys: { 1: "寻物启事", 2: "招领启事" },
      types: [
        {
          key: 0,
          title: "全部分类"
        }
      ]
    };
  },
  methods: {
    showLost(data) {
      console.log(data);
      if (this.category == 1) {
        this.$router.push({
          name: "ShowLost",
          query: { lostId: data }
        });
      } else {
        this.$router.push({
          name: "ShowFound",
          query: { foundId: data }
        });
      }
    },
    currentChange(value) {
      console.log(value);
      this.search.page = value.cur;
      this.search.size = value.size;
      this.gotoSearch();
    },
    onClear() {
      this.search.start = "";
      this.search.end = "";
      this.gotoSearch();
    },
    onSearch(data) {
      this.search.word = data;
      this.gotoSearch();
    },
    change() {
      if (this.value.start) this.search.start = this.value.start + " 00:00:00";
      if (this.value.end) this.search.end = this.value.end + " 23:59:59";
      this.gotoSearch();
    },
    onchangeCategory(data) {
      console.log(data);
      this.category = data.key;
      this.gotoSearch();
    },
    onchangetype(data) {
      console.log(data);
      this.search.type = data.key;
      this.gotoSearch();
    },
    getCategory() {
      // 物品分类
      R.Category.getAll().then(res => {
        if (res.ok) {
          console.log(res.body);
          res.body.forEach(element => {
            let temp = {};
            temp.key = element.id;
            temp.title = element.name;
            this.types.push(temp);
          });
        }
      });
    },
    gotoSearch() {
      this.$Loading();
      // 寻物搜索
      this.searchResult = [];
      if (this.category == 1) {
        R.Lost.getLostList(this.search).then(res => {
          console.log(res);
          if (res.ok) {
            res.body.list.forEach(lost => {
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
              this.searchResult.push(temp);
            });

            this.search.page = res.body.page;
            this.search.size = res.body.size;
            this.search.total = res.body.total;
          }
        });
      } else {
        // 招领搜索
        R.Found.getFoundList(this.search).then(res => {
          console.log(res);
          if (res.ok) {
            res.body.list.forEach(lost => {
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
              this.searchResult.push(temp);
            });

            this.datas = res.body.list;
            this.search.page = res.body.page;
            this.search.size = res.body.size;
            this.search.total = res.body.total;
          }
        });
      }
      this.$Loading.close();
    }
  },
  mounted() {
    let keyword = this.$route.params.keyword;

    console.log(keyword);

    if (keyword) {
      this.search.word = keyword;
    }

    let category = this.$route.params.category;
    if (category) this.category = category;

    this.getCategory();

    this.gotoSearch();
  }
};
</script>

<style lang="less" scoped>
.search-index {
  margin: 40px 0px;
  .search-picker {
    .search-filter-wrap {
      display: flex;
      margin: 15px 0px;
      align-items: center;
      height: 30px;
      .search-picker-title {
        font-size: 16px;
        font-weight: bold;
        margin-right: 30px;
        width: 100px;
        height: 30px;
        line-height: 30px;
      }
    }
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
    margin: 20px 0px;
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
</style>
