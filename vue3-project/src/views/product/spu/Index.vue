<template>
    <div>
        <Category :screen="screen"></Category>
        <el-card style="margin:10px 0px">
            <div v-show="screen===0?true:false">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true" @click="addSpu" v-has="`btn.Spu.add`">添加SPU</el-button>
                <el-table border style="margin:10px 0px" :data="spuData">
                    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #="{row}">
                            <el-button type="primary" icon="Plus" size="small" title="添加SKU" @click="addSku(row)" v-has="`btn.Spu.addsku`"></el-button>
                            <el-button type="primary" icon="Edit" size="small" title="修改SPU" @click="updateSpu(row)" v-has="`btn.Spu.update`"></el-button>
                            <el-button type="info" icon="View" size="small" title="查看SKU" @click="lookSkuList(row)" v-has="`btn.Spu.skus`"></el-button>
                            <el-popconfirm title="你确定要删除吗?" @confirm="reomveSpu(row)">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" size="small" title="删除SPU" v-has="`btn.Spu.delete`"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[3,5,7]"
                    :background="true"
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="handler"
                    @size-change="handler1"
                />
            </div>
            <SpuForm v-show="screen===1?true:false" @cancel1="cancel1" ref="spu"></SpuForm>
            <SkuForm v-show="screen===2?true:false" @cancel1="cancel1" ref="sku"></SkuForm>
            <!-- 展示sku列表 -->
            <el-dialog v-model="showSKuList" title="SKU列表">
                <el-table :data="skuArr">
                    <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #="{row}">
                            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>    

<script setup lang="ts">
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
// 引入三级分类
import Category from '@/components/Category/Index.vue';
import {ref , watch ,onBeforeUnmount} from 'vue';
import useCategoryStore from '@/store/modules/category';
import {reqSPU,reqSkuList,reqRemoveSpu} from '@/api/product/spu/index.ts';
import type {spuResponseData , recordsData,skuList,skuData} from '@/api/product/spu/type.ts';
import { ElMessage } from 'element-plus';
const categoryStore=useCategoryStore();
// 场景值
const screen=ref<number>(0);
// 分页器当前页数
const currentPage=ref<number>(1);
// 分页器每页个数
const pageSize=ref<number>(3);
// 数据总个数
const total=ref<number>(0);
// 存储已有SPU数据
const spuData=ref<recordsData[]>([])
// SpuForm的vc实例
const spu =ref<any>();
// SkuForm的vc实例
const sku =ref<any>();
// 存储sku列表
const skuArr=ref<skuData[]>([]);
// 控制sku对话框的展示
const showSKuList=ref<boolean>(false);

// 获取spu的方法
const getSpu=async()=>{
    const result : spuResponseData=await reqSPU(currentPage.value,pageSize.value,categoryStore.c3Id);
    if(result.code===200){
        spuData.value=result.data.records;
        total.value=result.data.total;
    }
}
watch(()=>categoryStore.c3Id,()=>{
    // 当c3Id变化且不为空时发送请求
    if(!categoryStore.c3Id) return;
    getSpu();
})
// 分页器页数变化时的回调
const handler=()=>{
    getSpu();
}
// 每页个数变化时的回调
const handler1=()=>{
    currentPage.value=1;
    getSpu();
}

// 添加spu回调
const addSpu = ()=>{
    screen.value=1;
    spu.value.addSpu(categoryStore.c3Id);
}
// 修改spu回调
const updateSpu=(row:recordsData)=>{
    screen.value=1;
    // 通知子组件发送请求获取数据进行渲染
    spu.value.getSpu(row);
    
}
// 接收场景2取消按钮回调
const cancel1=(data:any)=>{ 
    if(data.params==='add'){
        currentPage.value=1;
    }
    screen.value=data.num;
    getSpu();
}
// 添加sku
const addSku=(row:any)=>{
    screen.value=2;
    sku.value.initSkuData(categoryStore.c1Id,categoryStore.c2Id,row);
}
// 查看sku列表
const lookSkuList=async(row:any)=>{
    const result : skuList= await reqSkuList(row.id);
    if(result.code===200){
        skuArr.value=result.data;
    }
    showSKuList.value=true;
}

// 删除spu
const reomveSpu=async(row:any)=>{
    const result : any= await reqRemoveSpu(row.id);
    if(result.code===200){
        ElMessage.success('删除成功');
        getSpu();
    }else{
        ElMessage.error('删除失败');
    }
}
onBeforeUnmount(()=>{
    categoryStore.$reset();
})
</script>

<style scoped>

</style>