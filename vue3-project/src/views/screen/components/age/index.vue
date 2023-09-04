<template>
    <div class="box">
        <div class="title">
            <p>性别比例</p>
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
    const mychasrts = echarts.init(charts.value);
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '30',
            right: '20',
            orient:'vertical',
            textStyle: {
                color: 'white',
                fontSize: 14
            },
            width:'20',
        },
        series: [
            {
                name: '性别比例',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                bottom:30,
                left:-20,
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '搜索引擎' },
                    { value: 735, name: '方向' },
                    { value: 580, name: '邮件' },
                    { value: 484, name: '联合' },
                    { value: 300, name: '录音' }
                ]
            }
        ]
    };
    mychasrts.setOption(option);
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;

    .title {
        color: white;
        font-size: 20px;
    }
    .charts{
        width:100%;
        height:260px;
    }
}
</style>