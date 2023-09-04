<template>
    <div class="box">
        <div class="title">
            <p>年度热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
const charts = ref();

onMounted(() => {
    const mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            text: '景区总热度',
            left: '50%',
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {
            type: 'category',
            data: ['北京', '杭州', '广州', '上海', '苏州', '南京', '黑龙江']
        },
        yAxis: {
            show: true
        },
        emphasis: {
            focus: 'series',
            blurScope: 'coordinateSystem'
        },
        grid: {
            left: 40,
            top: 30,
            right: 0,
            bottom: 30
        },
        series: [
            {
                type: 'bar',
                data: [2324, 3434, 5627, 6443, 1224, 4653, 6989],
                //柱状图的:图形上的文本标签，
                label: {
                    show: true,
                    //文字的位置
                    position: 'insideTop',
                    //文字颜色
                    color: 'white',
                    fontSize: 16
                },
                showBackground: true,
                itemStyle: {
                    color: 'skyblue',
                    borderColor: 'blue',
                },

            },
            {
                type: 'line',
                data: [1225, 2356, 3421, 2389, 795, 2568, 4547],
                symbol: 'circle',
                symbolSize: 12,
                itemStyle: {
                    color: 'hotpink',
                    opacity: 0.6
                },
                emphasis: {
                    itemStyle: {

                    },
                    label: {
                        show: true,
                        color: 'white',
                        fontSize: 20
                    }
                }
            }
        ]
    })
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-rt.png) no-repeat;
    background-size: cover;
    margin: 10px 0px;

    .title {
        color: white;
        font-size: 20px;
    }

    .charts {
        width: 100%;
        height: calc(100% - 40px);
    }
}
</style>