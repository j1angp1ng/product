<template>
    <div class="box">
        <div class="title">
            <p>未来七天游客量趋势图</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const charts = ref();

onMounted(() => {
    const mycharts = echarts.init(charts.value);
    mycharts.setOption({
        xAxis:{
            type: 'category',
            //两侧不留白
            boundaryGap: false,
            //分割线不要
            splitLine: {
                show: false
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            //轴线的设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            }
        },
        yAxis:{
            splitLine: {
                show: false
            },
            //轴线的设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            }
        },
        series:[
            {
                type:'line',
                data: [500, 2000, 66, 2299, 321, 1100, 1200],
                //平滑曲线的设置
                smooth: true,
                //区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'skyblue' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }

            }
        ],
        grid:{
            top:20,
            left:40,
            right:0,
            bottom:30
        }
    })
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: cover;
    margin: 0px 20px;

    .title {
        color: white;
        font-size: 20px;
    }

    .charts {
        width: 100%;
        height: calc(100% - 40px);
        margin-top: 10px 0px;
    }
}</style>