<template>
    <div class="container">
        <div class="screen" ref="screen">
            <Top></Top>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="counter"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue';
import Tourist from './components/tourist/index.vue';
import Sex from './components/sex/index.vue';
import Age from './components/age/index.vue';
import Map from './components/map/index.vue';
import Line from './components/line/index.vue';
import Rank from './components/rank/index.vue';
import Year from './components/year/index.vue';
import Counter from './components/counter/index.vue';

import {ref,onMounted} from 'vue';
const screen=ref();
// 组件挂载完后进行缩放
onMounted(()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`;
})
window.onresize=()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`;
}

const getScale=(w=1920,h=1080)=>{
    const ww=window.innerWidth/w;
    const wh=window.innerHeight/h;
    return ww<wh?ww:wh;
}

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size:cover;
    .screen {
        position:fixed;
        width:1920px;
        height:1080px;
        left:50%;
        top:50%;
        transform-origin:left top;
        .bottom{
            display:flex;
            .left{
                height:1040px;
                flex:1;
                display:flex;
                flex-direction:column;
                .tourist{
                    flex:1.2;
                }
                .sex{
                    flex:1;
                }
                .age{
                    flex:1;
                }
                
            }
            .center{
                flex:2;
                display:flex;
                flex-direction:column;
                .map{
                    flex:3;
                }
                .line{
                    flex:1;
                }

            }
            .right{
                flex:1;
                margin-left:40px;
                display:flex;
                flex-direction:column;
                .rank{
                    flex:1.5;
                }
                .year{
                    flex:1;
                }
                .counter{
                    flex:1;
                }
            }
        }
    }

    
}
</style>