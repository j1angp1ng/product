<template>
    <!-- 右侧按钮 -->
    <el-button icon="Refresh" circle size="small" @click="changeRefresh"/>
    <el-button icon="FullScreen" circle size="small" @click="fullScreen"/>
    <el-popover
        placement="bottom"
        title="主题颜色"
        :width="200"
        trigger="hover"
    >
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" show-alpha @change="setColor" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" active-icon="Moon" inactive-icon="Sunny" inline-prompt @change="changeDark"/>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle size="small" />
        </template>
    </el-popover>
    <!-- 头像 -->
    <img :src="userStore.avatar" style="width:32px;height:32px;margin:0px 10px;border-radius:20px">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import {ref} from 'vue';
// 获取layout仓库
import useLayoutStore from '@/store/setting.ts';
const layoutStore=useLayoutStore();
// 获取user仓库
import useUserStore from '@/store/modules/user.ts';
const userStore=useUserStore();
// 获取路由器对象
import {useRouter ,useRoute} from 'vue-router';
const $router=useRouter();
// 获取路由对象
const $route=useRoute();
const dark=ref<boolean>(false);
const color = ref('rgba(255, 69, 0, 0.68)');


// 刷新功能回调
const changeRefresh=()=>{
    layoutStore.refresh = ! layoutStore.refresh;
}
// 全屏按钮回调
const fullScreen=()=>{
    // fullscreenElement可以判断是否全屏
    // console.log(document.fullscreenElement);
    let full=document.fullscreenElement;
    if(!full) {
        // document.documentElement.requestFullscreen();可以实现全屏
        document.documentElement.requestFullscreen();
    }else {
        // 退出全屏
        document.exitFullscreen();
    }
}
// 退出登录回调
const logout=async ()=>{
    // 发送请求[退出登录接口]
    // 删除token以及用户数据
    await userStore.logout();
    // 跳转到登录页面
    $router.push({path:'/login',query:{redirect:$route.path}});
}
// 切换暗黑模式
const changeDark=()=>{
    const html=document.documentElement;
    dark.value?html.className='dark':html.className='';
}
// 设置主题颜色
const setColor=()=>{
    const html=document.documentElement;
    html.style.setProperty('--el-color-primary',color.value);
}


</script>

<style scoped></style>