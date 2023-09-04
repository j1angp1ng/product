<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Left></Left>
        </div>
        <div class="tabbar_right">
            <Right></Right>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧结构
import Left from './left/Index.vue';
import Right from './right/Index.vue';
</script>
<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;

    }
    .tabbar_right{
        display:flex;
        align-items: center;
        color:black
    }
    
}
</style>