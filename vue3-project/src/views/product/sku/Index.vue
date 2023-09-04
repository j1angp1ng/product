<template>
    <el-card>
        <el-table border style="margin:20px 0px" :data="skuArr">
            <el-table-column type="index" align="center" label="序号" width="80px"></el-table-column>
            <el-table-column show-overflow-tooltip label="名称" width="150px" prop="skuName"></el-table-column>
            <el-table-column show-overflow-tooltip label="描述" width="150px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片"  width="150px">
                <template #="{row}">
                    <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
                </template>
            </el-table-column>
            <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="150px" prop="price"></el-table-column>
            <el-table-column label="操作" width="220px" fixed="right">
                <template #="{row}">
                    <el-button 
                    :type="row.isSale===1?'default':'success'" 
                    size="small" 
                    :icon="row.isSale===1?'Bottom':'Top'" 
                    :title="row.isSale===1?'下架':'上架'"
                    @click="sale(row)"
                    v-has="`btn.Sku.updown`"
                    ></el-button>
                    <el-button type="primary" size="small" icon="Edit" title="编辑SKU" @click="Edit" v-has="`btn.Sku.update`"></el-button>
                    <el-button type="info" size="small" icon="InfoFilled" title="查看信息" @click="findSku(row)" v-has="`btn.Sku.detail`"></el-button>
                    <el-popconfirm title="你确定要删除吗?" @confirm="removeSku(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete" title="删除SKU" v-has="`btn.Sku.remove`"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :background="true"
            layout=" prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getSkuList()"
            @size-change="handler"
            />
        <!-- 抽屉 -->
        <el-drawer v-model="skuDetail" >
            <template #header>
            <h4>商品详细信息</h4>
            </template>
            <template #default>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuDetails.skuName }}</el-col>
                </el-row>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuDetails.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuDetails.price }}</el-col>
                </el-row>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin:5px" v-for="item in skuDetails.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin:5px" v-for="item in skuDetails.skuSaleAttrValueList" :key="item.id">{{ item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin:10px 0px">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <!-- 轮播图 -->
                        <el-carousel :interval="4000" type="card" height="200px" indicator-position="none">
                            <el-carousel-item v-for="item in skuDetails.skuImageList" :key="item.id">
                            <img :src="item.imgUrl" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>

    </el-card>
</template>

<script setup lang="ts">
import {ref , onMounted} from 'vue';
import { reqSkuList , reqSale ,reqUnSale,reqSku ,reqRemoveSku} from '@/api/product/sku';
import type {skuResponseData ,skuData,skuDetailData} from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
const currentPage=ref(1);
const pageSize=ref(5);
// 存储sku总数
const total=ref<number>(0);
// 存储sku数据
const skuArr=ref<skuData[]>([]);
// 抽屉展示与隐藏
const skuDetail=ref<boolean>(false);
// 存储某个sku的详细信息
const skuDetails=ref<any>({});

// 获取sku列表的方法
const getSkuList=async()=>{
    const result : skuResponseData= await reqSkuList(currentPage.value,pageSize.value);
    if(result.code===200){
        total.value=result.data.total;
        skuArr.value=result.data.records;
    }
    
}
onMounted(()=>{
    getSkuList();
})

// 每个个数发生变化时的回调
const handler=()=>{
    currentPage.value=1;
    getSkuList();
}
// sku上架与下架回调
const sale=async(row:skuData)=>{
    if(row.isSale===1){
        await reqUnSale(row.id as number);
        ElMessage.success('下架成功');
        getSkuList();
    }else{
        await reqSale(row.id as number);
        ElMessage.success('上架成功');
        getSkuList();
    }
}
// 编辑sku信息
const Edit=()=>{
    ElMessage.success('该模块尚未开发...');
}
// 查看商品详细信息
const findSku=async(row:skuData)=>{
    skuDetail.value=true;
    const result : skuDetailData= await reqSku(row.id as number);
    if(result.code===200){
        skuDetails.value=result.data;
    } 
}
// 删除sku
const removeSku=async(row:skuData)=>{
    const result:any  =await reqRemoveSku(row.id as number);
    if(result.code===200){
        ElMessage.success('删除成功');
        getSkuList();
    }else{
        ElMessage.success('删除失败');
    }
    
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>