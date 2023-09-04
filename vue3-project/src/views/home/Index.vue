<template>
    <div>
    <el-card>
        <div class="card">
            <img :src="userStore.avatar" alt="" class="img">
            <div class="title">
                <h1 style="font-size:25px;font-weight: 1000;">{{ getTime() }}好呀，{{ userStore.username }}</h1>
                <p style="margin:20px 0px;color:skyblue">欢迎来到{{ set.title }}</p>
            </div>
        </div>
    </el-card>
    <SvgIcon name="welcome" class="svg" width="500px" height="300px"></SvgIcon>
    </div>
</template>

<script setup lang="ts">
import set from '@/setting';
import getTime from '@/utils/time';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.card{
    display:flex;
    justify-content: left;
    align-items: center;
    .img{
        width:100px;
        height:100px;
        border-radius:50px;
    }
    .title{
        margin-left:30px;
    }
}
.svg{
    display:flex;
    justify-content: center;
}
</style>