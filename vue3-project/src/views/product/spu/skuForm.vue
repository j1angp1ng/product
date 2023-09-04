<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form inline label-width="100px">
                <el-form-item v-for="item in attrList" :key="item.id" :label="item.attrName" >
                    <el-select v-model="item.idParams">
                        <el-option v-for="i in item.attrValueList " :key="i.id" :label="i.valueName" :value="`${item.id}:${i.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item >
        <el-form-item label="销售属性" >
            <el-form inline label-width="100px">
                <el-form-item v-for="item in saleAttrList" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.idParams">
                        <el-option v-for="i in item.spuSaleAttrValueList" :key="i.id" :label="i.saleAttrValueName" :value="`${item.id}:${i.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgList" ref="table">
                <el-table-column type="selection" align="center" ></el-table-column>
                <el-table-column label="图片" >
                    <template #="{row}">
                        <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row}">
                        <el-button type="primary" @click="handlerUrl(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {getAttrList} from '@/api/product/attr/index.ts';
import {reqSpuImgList,reqSpuSaleAttrList,reqAddSku} from '@/api/product/spu/index.ts';
import {ref,reactive} from 'vue';
import type {skuData} from '@/api/product/spu/type.ts';
import { ElMessage } from 'element-plus';
// 存储平台属性
const attrList=ref<any>([]);
// 存储spu已有照片
const imgList=ref<any>([]);
// 存储已有销售属性
const saleAttrList=ref<any>([]);
// 存储sku数据
const skuParams=reactive<skuData>({
    "skuName": '',
    "category3Id":'',
    "price": '',
    "skuDefaultImg": '',
    "skuDesc": '',
    "spuId": '',
    "tmId":'',
    "weight": '',
    "skuAttrValueList": [],
    "skuSaleAttrValueList": [],
});
// table组件实例
const table=ref<any>();

// 接收自定义事件
const emit=defineEmits(['cancel1']);
// 取消按钮回调
const cancel=()=>{
    emit('cancel1',{num:0});
}

// 初始化sku数据
const initSkuData=async(c1Id:number|string,c2Id:number|string,spu:any)=>{   
    // 存储sku数据
    skuParams.category3Id=spu.category3Id;
    skuParams.spuId=spu.id;
    skuParams.tmId=spu.tmId;
    // 发送请求获取数据
    const result1 =await getAttrList(c1Id,c2Id,spu.category3Id);
    const result2 =await reqSpuImgList(spu.id);
    const result3 =await reqSpuSaleAttrList(spu.id);
    // 把数据存在在组件上，供渲染使用
    attrList.value=result1.data;
    imgList.value=result2.data;
    saleAttrList.value=result3.data;
}

// 收集sku照片数据
const handlerUrl=(row:any)=>{
    skuParams.skuDefaultImg=row.imgUrl;
    // toggleRowSelection用于多选表格，切换某一行的选中状态
    // 避免多个选中，排他思想
    imgList.value.forEach((item:any)=>{
        table.value.toggleRowSelection(item,false);
    })
    table.value.toggleRowSelection(row,true);
}
// 保存sku回调
const save=async()=>{
    // 整合sku数据
    // attr属性
    attrList.value.forEach((item:any)=>{
        if(item.idParams){
            const [attrId,valueId]=item.idParams.split(':');
            const attrValue={attrId,valueId};
            skuParams.skuAttrValueList.push(attrValue);
        }
    })
    // 销售属性
    skuParams.skuSaleAttrValueList=saleAttrList.value.reduce((prev:any,next:any)=>{
       if(next.idParams){
        const [saleAttrId,saleAttrValueId] = next.idParams.split(':');
        prev.push({
            saleAttrId,
            saleAttrValueId
        })
       } 
       return prev;
    },[])
    
    // 发送请求
    const result:any = await reqAddSku(skuParams);
    if(result.code===200){
        ElMessage.success('添加成功');
        emit('cancel1',{num:0});
    }else{
        ElMessage.error('添加失败');
    }
    
}
defineExpose({initSkuData});
</script>

<style scoped>

</style>