<template>
    <div class="logo">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
// 引入logo文字配置文件
import setting  from '@/setting.ts';
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo{
    width:100%;
    height:$base-menu-logo-height;
    color:white;
    display:flex;
    align-items: center;
    margin-left:10px;
    img{
        width:40px;
        height:40px;
    }
    p{
        font-size:$base-menu-fontSize;
        margin-left:10px;
    }
}
</style>