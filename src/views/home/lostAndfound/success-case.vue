<style lang="less" scoped>
.success-box {
  margin: 40px 0px;
}
</style>

<template>
  <div class="success-box">
    <!-- 成功案例开始 -->
    <div class="page shadow">
      <div class="h-panel">
        <div class="h-panel-bar">
          <div class="h-panel-title">
            <Button color="blue" icon="el-icon-notebook-1" @click="searchLost">寻物启事</Button>&nbsp;&nbsp;&nbsp;
            <Button color="yellow" icon="el-icon-notebook-2" @click="searchFound">招领启事</Button>
          </div>
          <div class="h-panel-right">
            <Search placeholder="查询" v-model="search.word" v-width="200"></Search>
            <i class="h-split"></i>
            <button class="h-btn h-btn-green h-btn-m" @click="gotosearch">查询</button>
          </div>
        </div>
        <!-- 标题头部结束 -->
      </div>
      <div>
        <Table :datas="datas" :border="true" :checkbox="false" :stripe="true" :loading="loading">
          <TableItem title="发布者" prop="nickName" :width="150" align="center"></TableItem>
          <TableItem title="标题" :width="200" align="center">
            <template slot-scope="{ data }">
              <TextEllipsis
                :text="data.title"
                more="..."
                :height="20"
                :width="200"
                useTooltip
                tooltipTheme="drak"
                placement="top"
                @click="showLost(data.id)"
              ></TextEllipsis>
            </template>
          </TableItem>
          <TableItem title="类型" prop="type" :width="150" align="center"></TableItem>
          <TableItem title="发布时间" prop="createTime" :width="150" align="center"></TableItem>
          <TableItem title="浏览次数" prop="browse" :width="120" align="center"></TableItem>
          <TableItem title="评论次数" prop="comment" :width="120" align="center"></TableItem>
          <TableItem title="状态" :width="120" align="center">
            <template slot-scope="{ data }">
              <span class="h-tag h-tag-bg-blue" v-if="type==1">{{ data.status }}</span>
              <span class="h-tag h-tag-bg-yellow" v-if="type==2">{{ data.status }}</span>
            </template>
          </TableItem>
        </Table>
      </div>
      <div class="h-panel-bar">
        <Pagination
          v-if="datas.length > 0"
          layout="pager,total"
          :cur="search.page"
          :total="search.total"
          :small="true"
          align="right"
          @change="currentChange"
        ></Pagination>
      </div>
    </div>
    <!-- 成功案例结束 -->
  </div>
</template>

<script>
export default {
  name: "SuccessBase",
  data() {
    return {
      type: 1,
      search: {
        word: "",
        status: 2,
        page: 1,
        size: 10,
        total: 100
      },
      loading: false,
      datas: []
    };
  },
  methods: {
    showLost(data) {
      console.log(data);
      if (this.type == 1) {
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
    gotosearch() {
      this.search.page = 1;
      if (this.type) {
        this.searchLost();
      } else {
        this.searchFound();
      }
    },
    currentChange(value) {
      console.log(value);
      this.search.page = value.cur;
      this.search.size = value.size;
      if (this.type) {
        this.searchLost();
      } else {
        this.searchFound();
      }
    },
    searchLost() {
      this.type = 1;
      this.datas = [];
      this.loading = true;
      if (this.search.status == null) this.search.status = 0;
      R.Lost.getLostList(this.search).then(res => {
        console.log(res);
        if (res.ok) {
          this.datas = res.body.list;
          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;
        }
        this.loading = false;
      });
    },
    searchFound() {
      this.type = 2;
      this.datas = [];
      this.loading = true;
      if (this.search.status == null) this.search.status = 0;
      R.Found.getFoundList(this.search).then(res => {
        console.log(res);
        if (res.ok) {
          this.datas = res.body.list;
          this.search.page = res.body.page;
          this.search.size = res.body.size;
          this.search.total = res.body.total;
        }
        this.loading = false;
      });
    }
  },
  mounted() {
    this.searchLost();
  }
};
</script>