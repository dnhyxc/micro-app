<template>
  <div class="wrap">
    <div class="el-container-wrap">
      <el-container>
        <el-main class="el-main">
          <Header />
          <div class="content">
            <div class="right">
              <RouterView v-if="isRouterAlive" v-slot="{ Component }">
                <!-- 定义缓存组件：注意include="Create"，Create 组件内部必须声明组件名称 -->
                <KeepAlive include="Create">
                  <component :is="Component" />
                </KeepAlive>
              </RouterView>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, provide } from 'vue';
import Header from '@/components/Header/index.vue';

const isRouterAlive = ref<boolean>(true);

// 刷新当前页面
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

// 父组件注册刷新当前页面的方法
provide('reload', reload);
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background-color: var(--background);
  overflow: hidden;
  background-image: var(--bg-image-url);
  background-position: var(--bg-position);
  background-repeat: var(--bg-repeat);
  background-size: var(--bg-img-size);
  animation: var(--bg-animation);
  .bgKeyframes(bgmove);

  .el-container-wrap {
    height: 100vh;
    backdrop-filter: var(--backdrop-filter);

    :deep {
      .el-container {
        height: 100vh;
      }
    }
  }

  .el-main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 0;
  }

  .content {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    .pageHeight();
    width: calc(100% - 10px);
    padding-right: 10px;
    .right {
      flex: 1;
      border-radius: 5px;
    }
  }
  .mac-content {
    height: calc(100vh - 60px);
    width: 99.9%;
    padding: 0 10px;
  }
}
</style>
