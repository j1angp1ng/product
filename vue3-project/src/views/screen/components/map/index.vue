<template>
    <div class="box" ref="charts">
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import mapData from './map.json';
const charts = ref();

echarts.registerMap('china', mapData as any);
onMounted(() => {
    const mycharts = echarts.init(charts.value);
    // 注册地图
    mycharts.setOption({
        geo: {
            map: 'china',
            width: 900,
            height: 900,
            top: 100,
            roam: true,//开启鼠标缩放
            label: {
                show: true,
                color: 'white'
            },
            itemStyle: {
                //每一个多边形的样式
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'blue' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'skyblue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                opacity: .8
            },
            emphasis: {
                itemStyle: {
                    color: 'white'
                },
                label: {
                    show: true,
                    fontSize: 20,
                }
            }
        },
        series: {
            type: 'lines',
            data: [
                {
                    coords: [
                        [116.405285, 39.904989],  // 起点
                        [119.306239, 26.075302]   // 终点

                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'blue',
                        width: 3
                    }
                },
                {
                    coords: [
                        [116.405285, 39.904989],  // 起点
                        [114.298572, 30.584355]   // 终点

                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'bule',
                        width: 3
                    }
                },{
                    coords: [
                        [119.421247,23.216949], // 起点
                        [114.298572, 30.584355]   // 终点

                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'blue',
                        width: 3
                    }
                },
                {
                    coords: [
                        [113.280637,23.125178], // 起点
                        [112.549248, 37.857014]   // 终点

                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'blue',
                        width: 3
                    }
                },

            ],
            //开启动画特效
            effect: {
                show: true,
                symbol: 'arrow',
                color: 'red',
                symbolSize: 10
            }
        }
    })
})
</script>

<style scoped></style>