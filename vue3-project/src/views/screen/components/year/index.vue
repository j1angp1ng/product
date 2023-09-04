<template>
    <div class="box">
        <div class="title">
            <p>年度游客消费量数据</p>
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
        title:{
            text:'消费量（单位：千万）',
            left:'50%',
            textStyle:{
                color:'white'
            }

        },
        xAxis: {
            splitLine:{
                show:false
            },
        },
        yAxis: {
            splitLine:{
                show:false
            }
        },
        grid:{
            top:30,
            bottom:20,
            left:20,
            right:20
        },
        series: [
            {
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [10.0, 6.33],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter',
                itemStyle:{
                    color:'yellowgreen',
                    borderColor:'green',
                    borderWidth:4
                },
                emphasis:{
                    label:{
                        show:true,
                        fontSize:20,
                        color:'white'
                    },
                    
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
    background: url(../../images/dataScreen-main-rb.png) no-repeat;
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