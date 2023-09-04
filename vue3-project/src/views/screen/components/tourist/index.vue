<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="people">可预约总量<span>232348</span>人</p>
        </div>
        <div class="middle">
            <span v-for="(item,index) in person" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import {ref,onMounted} from 'vue';
const person=ref('232348人');
const charts=ref();

onMounted(()=>{
    //获取echarts类的实例
    let mycharts = echarts.init(charts.value);
    //设置实例的配置项
    let options={
        // 标题
        title:{
            text:'水球图'
        },
        //系列:决定你展示什么样的图形图标
        series: {
            type: 'liquidFill',//系列
            data: [0.6,0.4,0.1],//展示的数据
            waveAnimation: true,//动画
            animationDuration: 3,
            animationDurationUpdate: 0,
            radius: '95%',//半径
            outline: {//外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },
        },
        //布局组件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    }

    // 使用刚指定的配置项和数据显示图表。
      mycharts.setOption(options);
})
</script>

<style scoped lang="scss">
.box {
    margin-top: 10px;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    .top {
        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png);
            background-size: cover;
            margin-top: 10px;
        }

        .people {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: tan;
            }
        }
    }

    .middle {
        margin-top:40px;
        display:flex;
        padding:10px;
        span{
            flex:1;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: url(../../images/total.png) no-repeat;
            background-size: cover;
            color:#29fcff;
            font-size:30px;
        }
    }
    .charts {
        width: 100%;
        height: 270px;
    }
}</style>