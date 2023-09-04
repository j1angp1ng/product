<template>
    <div class="box">
        <div class="top">
            <p class="title">男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="women">
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p class="man">男士比例</p>
            <p class="woman">女士比例</p>
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
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'

        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 30,
                z: 100,
                itemStyle: {
                    color: 'blue',
                    borderRadius: 30
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 30,
                //调整女士柱条位置
                barGap: '-100%',
                itemStyle: {
                    color: 'hotpink',
                    borderRadius: 30
                }
            }
        ],
        grid: {
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;
    margin: 20px 0px;

    .top {
        .title {
            color: white;
            font-size: 20px;
        }

        img {
            margin: 10px 0px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .women {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;

        .man {
            margin: 0px 50px;
        }

        .woman {
            margin: 0px 50px;
        }
    }

    .charts {
        width: 100%;
        height: 100px;
    }
}
</style>