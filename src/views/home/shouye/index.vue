<template>
  <div class="shouye">
    <div class="page banner shadow">
      <el-carousel :interval="5000" height="480px">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shouye",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.shouye {
  margin: 20px 0px;
  banner {
    background-color: white;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
