<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ isfold: layoutStore.fold }">
            <!-- 图片 -->
            <Logo></Logo>
            <!-- 菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" :default-active="$route.path"
                    :collapse="layoutStore.fold">
                    <Menu :menuList="userStore.routeList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_header" :class="{ isfold: layoutStore.fold }">
            <Header></Header>
        </div>
        <div class="layout_main" :class="{ isfold: layoutStore.fold }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入logo组件
import Logo from './logo/Index.vue'
// 引入菜单
import Menu from './menu/Index.vue'
// 引入路由配置信息
import useUserStore from '@/store/modules/user.ts';
// 引入主体
import Main from '@/layout/main/Index.vue';
// 引入头部
import Header from './tabbar/Index.vue';
// 获取路由信息
import { useRoute } from 'vue-router';
// 引入仓库数据
import useLayoutStore from '@/store/setting.ts';
const layoutStore = useLayoutStore();
const $route = useRoute();
const userStore = useUserStore();


</script>

<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            height: calc(100vh - $base-menu-logo-height);
            color: white;

            .el-menu {
                border-right: none;
            }
        }

        &.isfold{
            width:$base-menu-foldWidth;
        }

    }

    .layout_header {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-header-height;
        left: $base-menu-width;
        top: 0;
        transition: all 0.3s;

        &.isfold {
            width: calc(100vw - $base-menu-foldWidth);
            left: $base-menu-foldWidth;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-header-height);
        left: $base-menu-width;
        top: $base-header-height;
        padding: 10px;
        overflow: auto;
        transition: all 0.3s;

        &.isfold {
            width: calc(100vw - $base-menu-foldWidth);
            left: $base-menu-foldWidth;
        }
    }
}
</style>