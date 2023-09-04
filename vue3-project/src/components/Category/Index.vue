<template>
    <el-card style="margin:10px 0">
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="handler" :disabled="screen===0?false:true">
                    <el-option 
                    v-for="item in categoryStore.c1Arr" 
                    :key="item.id" 
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="handler1" :disabled="screen===0?false:true">
                    <el-option 
                    v-for="c2 in categoryStore.c2Arr" 
                    :key="c2.id" 
                    :label="c2.name" 
                    :value="c2.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" :disabled="screen===0?false:true">
                    <el-option 
                    v-for="c3 in categoryStore.c3Arr" 
                    :key="c3.id" 
                    :label="c3.name" 
                    :value="c3.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category.ts';
import {onMounted} from 'vue';
const categoryStore=useCategoryStore();
defineProps(['screen'])
// 封装获取数据方法
const getC1=async ()=>{
    await categoryStore.getc1();
}
onMounted(()=>{
    getC1();
})
// 一级分类发生变化时触发
const handler=async ()=>{
    // 发生变化前清空相应数据
    categoryStore.c2Id='';
    categoryStore.c3Id='';
    categoryStore.getc2();
    
}
// 二级分类发生变化时触发
const handler1=async ()=>{
    // 发生变化前清空相应数据
    categoryStore.c3Id='';
    categoryStore.getc3();
    
}
</script>

<style scoped></style>