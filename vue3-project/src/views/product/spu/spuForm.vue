<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuData.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请输入SPU品牌" v-model="spuData.tmId">
                <el-option v-for="item in trademarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入描述" v-model="spuData.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload
                v-model:file-list="spuImgList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible" style="width:400px;height:400px">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select :placeholder="unSelectSaleAttr.length?`还有${unSelectSaleAttr.length}个属性未选择`:`无`" v-model="unSelectValue">
                <el-option 
                v-for="item in unSelectSaleAttr" 
                :key="item.id" :label="item.name" 
                :value="`${item.id}:${item.name}`" 
                ></el-option>
            </el-select>
            <el-button 
            type="primary" 
            icon="Plus" 
            style="margin-left:10px" 
            :disabled="unSelectValue?false:true"
             @click="addSaleAttr"
             >添加销售属性</el-button>
            <el-table border style="margin:10px 0px" :data="spuSaleAttrList">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="属性名" width=150px prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{row,$index}">
                        <el-tag
                            style="margin:0px 5px"
                            v-for="item in row.spuSaleAttrValueList"
                            :key="item.id"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(item,row)"
                        >
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input 
                        v-if="row.flag===true" 
                        placeholder="请输入属性值" 
                        style="width:100px" 
                        size="small" 
                        @blur="toLook(row)" 
                        v-model="row.saleAttrValue"
                        ></el-input>
                        <el-button v-else type="primary" icon="Plus" size="small" @click="toEdit(row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template #="{row,$index}">
                    <el-button type="danger" icon="Delete" @click="spuSaleAttrList.splice($index,1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save" :disabled="spuSaleAttrList.length>0?false:true">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {ref , computed } from 'vue';
import type {recordsData , Trademark ,AllTrademark ,SpuImg,spuImgList,spuSale,spuSaleAttr ,saleAttr , saleAttrData,spuSaleAttrValue} from '@/api/product/spu/type.ts';
import {reqAllTrademark , reqSpuImgList , reqSpuSaleAttrList,reqAllSaleAttr,addOrUpdateSpu} from '@/api/product/spu/index.ts';
import { ElMessage } from 'element-plus';
// 接收父组件自定义事件
const emits=defineEmits(['cancel1'])
// 存储所有spu品牌
const trademarkList=ref<Trademark[]>([]);
// 存储某个spu的所有照片
const spuImgList=ref<SpuImg[]>([]);
// 存储某个spu对应的销售属性
const spuSaleAttrList=ref<spuSale[]>([]);
// 存储spu所有的销售属性
const allSpuSaleAttr=ref<saleAttr[]>([]);
// 存储spu部分数据
const spuData=ref<recordsData>({
    spuName:'',
    tmId:'',
    category3Id:'',
    description:'',
    spuImageList:[],
    spuSaleAttrList:[]
});

// 控制放大图片的显示与隐藏
const dialogVisible=ref<boolean>(false);
// 存储放大图片的地址
const dialogImageUrl=ref<string>('');
// spu为选择的销售属性
const unSelectSaleAttr=computed(()=>{
    const unselectList= allSpuSaleAttr.value.filter((item)=>{
        return spuSaleAttrList.value.every(item1=>{
            return item1.saleAttrName!=item.name;
        });
    });
    return unselectList;
});
// 收集未选择的销售属性
const unSelectValue=ref<string>('');

// 取消按钮回调
const cancel=()=>{
    emits('cancel1',{num:0});
}

// 获取品牌spu、spu照片墙、spu销售属性以及所有spu销售属性的回调
const getSpu=async(spu:recordsData)=>{
    // 存储部分spu数据
    spuData.value=spu;
    // 获取所有spu品牌数据
    const result : AllTrademark= await reqAllTrademark();
    trademarkList.value=result.data;
    // 根据spuId获取该spu的所有照片
    const result1 :spuImgList=await reqSpuImgList(spu.id as number);
    spuImgList.value=result1.data.map(item=>{
        return {
            name:item.imgName,
            url:item.imgUrl
        }
    });
    // 根据spuId获取该spu对应的销售属性
    const result2 : spuSaleAttr=await reqSpuSaleAttrList(spu.id as number);
    spuSaleAttrList.value=result2.data;
    // 获取spu所有的销售属性
    const result3: saleAttrData=await reqAllSaleAttr();
    allSpuSaleAttr.value=result3.data;
    
}

// 点击预览图片时触发的钩子
const handlePictureCardPreview=(file:any)=>{
    dialogImageUrl.value=file.url;
    dialogVisible.value=true;
}
// 点击删除时触发的钩子
const handleRemove=()=>{
}

// 添加销售属性回调
const addSaleAttr=()=>{
    // 创建一个新的销售属性对象，添加到已有的数组中
    const [baseSaleAttrId,saleAttrName]=unSelectValue.value.split(':');
    const unSelect : spuSale={
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
    }
    spuSaleAttrList.value.push(unSelect);
    unSelectValue.value='';
}

// 切换编辑模式进行添加属性值
const toEdit=(row:spuSale)=>{
    row.flag=true; 
    row.saleAttrValue='';
}
// 切换查看模式进行操作
const toLook=(row:spuSale)=>{
    // 把收集到的销售属性整合成一个新对象添加到已有销售属性值的数组中
    const {baseSaleAttrId,saleAttrValue} =row;
    const newSale : spuSaleAttrValue={
        baseSaleAttrId,
        saleAttrValueName:saleAttrValue as string,
        saleAttrName:row.saleAttrName
    }

    // 属性值不能为空
    if(saleAttrValue?.trim()==='' || saleAttrValue===undefined){
        ElMessage.warning('属性值不能为空');
        row.flag=false;
        return ;
    }
    // 属性不能重复
    const repeat=row.spuSaleAttrValueList.find(item=>{
        return item.saleAttrValueName===saleAttrValue;
    })
    if(repeat){
        ElMessage.warning('属性值不能重复');
        row.flag=false;
        return ;
    }
    
    row.spuSaleAttrValueList.push(newSale);
    //变为查看模式
    row.flag=false;
}
// 删除标签回调
const handleClose=(item:spuSaleAttrValue,row:spuSale)=>{
    row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item),1);
}

// 保存数据
const save=async()=>{
    // 整合照片数据
    spuData.value.spuImageList=spuImgList.value.map((item:any)=>{
        return{
            imgName:item.name,
            imgUrl:(item.response&&item.response.data) || item.url
        }
    })
    // 整合销售属性数据
    spuData.value.spuSaleAttrList=spuSaleAttrList.value;
    // 发送请求
    const result:any=await addOrUpdateSpu(spuData.value);
    
    if(result.code===200){
        ElMessage.success(spuData.value.id?'修改成功':'添加成功');
        // 返回场景0，并重新获取新数据
        let params=spuData.value.id?'update':'add';
        emits('cancel1',{num:0,params});
    }else{
        ElMessage.error(spuData.value.id?'修改失败':'添加失败');
    }
    
}

// 添加一个新的spu回调
const addSpu=async(c3Id:number)=>{
    // 先清空原有数据
    Object.assign(spuData.value,{
        spuName:'',
        tmId:'',
        category3Id:'',
        description:'',
        spuImageList:[],
        spuSaleAttrList:[]
    })
    spuImgList.value=[];
    spuSaleAttrList.value=[];
    unSelectValue.value='';

    // 发送请求获取所有品牌和所有销售属性
    const result : AllTrademark= await reqAllTrademark();
    trademarkList.value=result.data;
    const result3: saleAttrData=await reqAllSaleAttr();
    allSpuSaleAttr.value=result3.data;
    spuData.value.category3Id=c3Id;
}

defineExpose({getSpu,addSpu});
</script>

<style scoped>

</style>