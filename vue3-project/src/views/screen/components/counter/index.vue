<template>
    <div class="box">
        <div class="title">
            <p>渠道统计</p>
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
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '娱乐', max: 6500 },
                { name: '饮食', max: 16000 },
                { name: '出行', max: 30000 },
                { name: '购物', max: 38000 },
                { name: '住宿', max: 52000 },
                { name: '其他', max: 25000 }
            ]
        },
        legend: {
            show: true,
            orient: 'vertical',
            data: ['今年', '5年内均值'],
            right:10,
            textStyle:{
                color:'white'
            }
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '今年'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '5年内均值'
                    }
                ],
                symbolSize: 10,
            }
        ]
    })
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-rb.png) no-repeat;
    background-size: cover;

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