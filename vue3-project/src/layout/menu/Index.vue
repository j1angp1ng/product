<template>
    <!-- 遍历 -->
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有一个子路由 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item :index="item.path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 多个子路由 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>

    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter();
// 接收路由配置信息
defineProps(['menuList'])
// 路由跳转回调
const goRoute = (vc: any) => {
    // 跳转
    $router.push(vc.index);
    // console.log(vc);
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped></style>