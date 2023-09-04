<template>
    <div>
        <router-view v-slot="{Component}">
            <Transition name="main" >
                <component :is="Component" v-if="flag"></component>
            </Transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import {ref ,watch ,nextTick} from 'vue';
// 获取layout仓库
import useLayoutStore from '@/store/setting.ts';
const layoutStore=useLayoutStore();
// 定义一个变量控制组件的生成和销毁
let flag=ref(true);

// 监听refresh
watch(()=>layoutStore.refresh,()=>{
    flag.value=false;
    // 拿到页面渲染完成时的dom元素,在进行渲染
    nextTick(()=>{
        flag.value=true;    
    })
})

</script>
<script lang="ts">
export default {
    name: 'Main'
}
</script>

<style scoped lang="scss">
.main-enter-from{
    opacity:0;
    transform: scale(0);
}
.main-enter-active{
    transition: all 0.5s;
}
.main-enter-to{
    opacity:1;
    transform: scale(1);
}
</style>