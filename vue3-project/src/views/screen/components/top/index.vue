<template>
    <div class="head">
        <div class="home">
            <span class="btn1" @click="goHome">首页</span>
        </div>
        <div class="title">
            <div class="tname">
                智慧旅游可视化大数据平台
            </div>
        </div>
        <div class="time">
            <span class="btn2">统计数据</span>
            <span class="newTime">当前时间:{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import {onMounted,ref,onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
const router=useRouter();
const time=ref('');
let timer=0;

const goHome=()=>{
    router.push('/home');
}
onMounted(()=>{
    timer=setInterval(()=>{
        time.value=moment().format('YYYY年MM月DD日 HH:mm:ss');
    },1000)
})
onBeforeUnmount(()=>{
    clearInterval(timer);
})
</script>

<style scoped lang="scss">
.head{
    width:100%;
    height:40px;
    display:flex;
    .home{
        flex:1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size:cover;
        .btn1{
            width:150px;
            height:40px;
            float:right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 35px;
            color:#29fcff;
            font-size:25px;
        }
    }
    .title{
        flex:2.5;
        .tname{
            width:100%;
            height:80px;
            background:url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height:40px;
            color:#29fcff;
            font-size:40px
        }
    }
    .time{
        flex:1.5;
        display:flex;
        justify-content: space-between;
        align-items: center;
        .btn2{
            width:150px;
            height:40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height:40px;
            color:#29fcff;
            font-size: 25px;
        }
        .newTime{
            color: #29fcff;
            font-size:20px;
        }
    }
}
</style>