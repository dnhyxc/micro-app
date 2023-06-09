<!--
 * 左侧菜单
 * @author: dnhyxc
 * @since: 2023-01-29
 * index.vue
-->
<template>
  <div :class="`${checkOS() === 'mac' && 'mac-left-menu-wrap'} left-menu-wrap`">
    <el-scrollbar ref="scrollRef">
      <div
        v-for="menu in menuList"
        v-show="!menu.hide"
        :key="menu.key"
        class="menu-list"
        @click="(e) => onSelectMenu(e, menu)"
      >
        <el-tooltip class="box-item" effect="light" :content="menu.name" placement="right">
          <i
            :class="`${
              ((activeMenu.path === menu.path && route.path.includes(menu.path)) ||
                commonStore.activePath === menu.path) &&
              'active'
            } ${menu.key} font iconfont ${menu.icon}`"
          />
        </el-tooltip>
      </div>
    </el-scrollbar>
    <div class="setting">
      <el-dropdown v-if="loginStore?.userInfo?.userId">
        <el-avatar
          shape="square"
          :size="checkOS() === 'mac' ? 45 : 38"
          fit="cover"
          :src="loginStore.userInfo?.headUrl || HEAD_IMG"
          class="avatar"
          @click.stop="toPersonal"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toPersonal">
              <div class="dropdown">
                <i class="iconfont icon-gerenzhongxin" />
                <span class="dropdown-text">我的主页</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click="onQuit">
              <div class="dropdown">
                <i class="iconfont icon-tuichu1" />
                <span class="dropdown-text">退出登录</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-else class="login-btn">
        <div class="login" @click.stop="onLogin">登录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MENULIST, HEAD_IMG } from '@/constant';
import { MenuListParams } from '@/typings/common';
import { commonStore, loginStore } from '@/store';
import { checkOS } from '@/utils';

const router = useRouter();
const route = useRoute();

const activeMenu = ref<MenuListParams>(MENULIST[0]);

// 计算菜单
const menuList = computed(() => {
  const { token } = loginStore;
  const list = token ? MENULIST : MENULIST.filter((i) => i.show);
  return list;
});

// 监听路由变化
watchEffect(() => {
  if (route.path.includes('/tag/list')) {
    const menu = MENULIST.find((i) => route.path.includes(i.path));
    if (menu) {
      activeMenu.value = menu;
    }
  }
});

// 选中菜单
const onSelectMenu = (e: Event, menu: MenuListParams) => {
  e.stopPropagation();
  activeMenu.value = menu;
  commonStore.setCrumbsInfo({
    crumbsName: menu.name,
    crumbsPath: menu.path,
  });
  if (route.path === menu.path) return;
  router.push(menu.path);
};

// 去我的主页
const toPersonal = () => {
  commonStore.setCrumbsInfo({
    crumbsName: '我的主页',
    crumbsPath: '/personal',
  });
  router.push('/personal');
};

// 登录
const onLogin = () => {
  router.push('/login');
};

// 退出登录
const onQuit = () => {
  commonStore.setCrumbsInfo({
    crumbsName: MENULIST[0].name,
    crumbsPath: MENULIST[0].path,
  });
  loginStore.onQuit();
  router.push('/login');
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.left-menu-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  width: 60px;
  .pageHeight();
  padding-left: 1px;
  border-radius: 5px;
  overflow: auto;

  .menu-list {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;

    .font {
      display: block;
      font-size: 26px;
      line-height: 32px;
      font-weight: 700;
      color: @sub-2-blue;
      cursor: pointer;
      .textLg();
    }

    .active {
      color: var(--active-color);
      .textLgActive();
    }
  }

  .setting {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    z-index: 99;

    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      border-radius: 5px;
      .clickNoSelectText();
      .bgMoveColor(135deg);
      .bgKeyframes(bgmove);
      font-size: 14px;
      cursor: pointer;
      color: var(--theme-blue);
      box-shadow: 0 0 2px var(--shadow-color) inset;
    }

    .avatar {
      cursor: pointer;
    }

    .dropdown {
      display: flex;
      align-items: center;

      .clickNoSelectText();

      .dropdown-text {
        font-size: 13px;
      }
    }
  }
}

.mac-left-menu-wrap {
  padding: 28px 0 10px;
  width: 68px;

  .icon-wrap {
    .page-icon {
      width: 38px;
      height: 38px;
      margin-bottom: 10px;
    }
  }

  .menu-list {
    .font {
      font-size: 32px;
    }
  }
}
</style>
