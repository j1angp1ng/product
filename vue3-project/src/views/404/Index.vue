<template>
    <div class="box">
        <button @click="goHome">点击返回首页</button>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
const router=useRouter();

const goHome=()=>{
    router.push('/');
}
</script>

<style scoped lang="scss">
.box{
    width:400px;
    height:400px;
    background: url(../../assets/images/error_images/404.png) no-repeat;
    background-size: cover;
    margin:auto;
    button{
        margin-left:150px;
        margin-top:400px;
        border-radius:30px;
        background: skyblue;
        color:white;
    }

}
</style>