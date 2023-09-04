<template>
    <!-- 左侧图标 -->
    <el-icon style="margin-left:10px" @click="layoutStore.changeIcon">
        <!-- <Expand /> -->
        <component :is="layoutStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left:10px">
        <el-breadcrumb-item 
        v-for="(item,index) in $route.matched" 
        :key="index" 
        v-show="item.meta.title"
        :to="item.path"
        >
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 标题 -->
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import useLayoutStore from '@/store/setting.ts';
// 获取仓库数据
const layoutStore=useLayoutStore();
// 路由信息
const $route=useRoute();



</script>

<style scoped></style>