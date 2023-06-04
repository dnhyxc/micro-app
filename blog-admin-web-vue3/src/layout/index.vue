<template>
  <div class="wrap">
    <el-container>
      <!-- <el-aside width="200px">
        <LeftMenu />
      </el-aside> -->
      <el-main class="el-main">
        <!-- <Header /> -->
        <div class="header">数据管理</div>
        <div class="content">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import LeftMenu from '@/components/LeftMenu/index.vue';
// import Header from '@/components/Header/index.vue';
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;

  .el-main {
    background-color: @bg-color-page;
    padding: 60px 0 10px 10px;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: @fff;
    padding: 0 20px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 700;
  }

  .content {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
  }
}
</style>
