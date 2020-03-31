<template>
  <div>
    <Row :space-x="15" :space-y="25">
      <Cell
        :xs="8"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="(item, index) in searchResult"
        :key="index"
      >
        <div>
          <div class="h-tag h-tag-bg-primary" v-if="item.statusId==1">{{item.status}}</div>
          <div class="h-tag h-tag-bg-red" v-if="item.statusId==2">{{item.status}}</div>
          <el-card
            style="height: 300px;cursor: pointer;"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <el-image
              class="image"
              style="height:220px"
              :src="item.image ? item.image : Default"
              fit="fill"
            ></el-image>
            <div style="padding: 12px;">
              <div>
                <TextEllipsis
                  :text="item.title"
                  :height="22"
                  useTooltip
                  tooltipTheme="drak"
                  placement="top"
                >
                  <template slot="more">...</template>
                </TextEllipsis>
              </div>
              <div class="bottom clearfix">
                <time class="time">
                  <span>{{item.createTime}}</span>&nbsp;
                  <span>
                    <i class="el-icon-view"></i>
                    {{item.browse}}
                  </span>&nbsp;
                  <span>
                    <i class="el-icon-chat-square"></i>
                    {{item.comment}}
                  </span>
                </time>
                <div class="button">
                  <el-dropdown trigger="click" @command="showLost">
                    <span class="el-dropdown-link">
                      菜单
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-plus" :command="{id:item.id,type:1}">查 看</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-circle-plus"
                        :command="{id:item.id,type:2}"
                      >修 改</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-circle-plus-outline"
                        :command="{id:item.id,type:3}"
                      >删 除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </Cell>
    </Row>
    <div style="margin-top:20px;"></div>
    <Row>
      <Cell :width="24">
        <Pagination
          layout="pager,total"
          :cur="search.page"
          :total="search.total"
          :size="search.size"
          align="left"
          @change="currentChange"
          v-if="searchResult.length > 0"
        ></Pagination>
      </Cell>
    </Row>
  </div>
</template>

<script>
import Default from "../../../images/default.jpg";
export default {
  name: "MyLost",
  data() {
    return {
      Default: Default,
      baseApi: this.$store.getters.baseApi + "/file/",
      username: this.$store.state.User.username,
      search: {
        username: "",
        page: 1,
        size: 9,
        total: 0
      },
      searchResult: []
    };
  },
  methods: {
    showLost(data) {
      if (data.type == 1) {
        this.$router.push({
          name: "ShowLost",
          query: { lostId: data.id }
        });
      }
      if (data.type == 2) {
        this.$router.push({
          name: "LostEditor",
          query: { lostId: data.id }
        });
      }
      if (data.type == 3) {
        this.$Confirm("是否确定删除该寻物启事？", "操作确人")
          .then(() => {
            R.Lost.deleteOne(data.id).then(res => {
              console.log(res);
              if (res.ok) {
                this.$Notice({
                  type: "success",
                  title: "成功",
                  content: "寻物启事已删除"
                });
                this.getLostList();
              }
            });
          })
          .catch(() => {});
      }
    },
    currentChange(value) {
      console.log(value);
      this.search.page = value.cur;
      this.search.size = value.size;
      // 刷新评论
      this.getLostList();
    },
    getLostList() {
      // 寻物搜索
      this.search.username = this.username;
      this.searchResult = [];
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
            temp.status = lost.status;
            temp.statusId = lost.statusId;
            this.searchResult.push(temp);
          });
          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;
        }
      });
    }
  },
  mounted() {
    this.getLostList();
  }
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>