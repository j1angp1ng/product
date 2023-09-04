<template>
    <div>
        <Category :screen="screen"></Category>
        <el-card v-if="screen==1?false:true">  
            <el-button 
            type="primary" 
            icon="Plus" 
            style="margin:10px 0" 
            :disabled="categoryStore.c3Id?false:true"
            @click="addAttrValue"
            v-has="`btn.Attr.add`"
            >添加属性
            </el-button>
            <el-table border :data="attrList">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="属性名称" width="150px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{row}">
                        <el-tag style="margin:5px" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template #="{row}">
                        <el-button type="primary" size="small" icon="Edit" @click="edit(row)" v-has="`btn.Attr.update`"></el-button>
                        <el-popconfirm title="你确认要删除吗？" @confirm="remove(row.id)" width="180px">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" v-has="`btn.Attr.remove`"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div v-if="screen==0?false:true">
            <el-card>
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="newAttrValue.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button 
                type="primary" 
                size="default" 
                icon="Plus" 
                :disabled="newAttrValue.attrName?false:true"
                @click="addAttrValueList"
                >添加属性</el-button>
                <el-table border style="margin:10px 0" :data="newAttrValue.attrValueList">
                    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{row,$index}">
                            <el-input placeholder="请输入属性值" v-model="row.valueName" v-if="!row.toggle" @blur="toLook(row,$index)" :ref="(vc:any)=>vcArr[$index]=vc"></el-input>
                            <div v-else="row.toggle" @click="toEdit(row,$index)">{{row.valueName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作" >
                        <template #="{row,$index}">
                            <el-button type="danger" icon="Delete" @click="newAttrValue.attrValueList.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save" :disabled="newAttrValue.attrValueList.length>0?false:true">保存</el-button>
                <el-button type="primary" size="default" @click="screen=0">取消</el-button>

            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {attrResponseData , dataValue , attrValue} from '@/api/product/attr/type.ts';
import {getAttrList , reqAddOrUpdate , removeAttr} from '@/api/product/attr/index.ts';
import {watch , ref , reactive, nextTick ,onBeforeUnmount} from 'vue';
// 存储一个新增的属性对象
const newAttrValue=reactive<dataValue>({
    attrName:'',
    categoryId:'',
    categoryLevel:3,
    attrValueList:[]
})
// 引入分类组件
import Category from '@/components/Category/Index.vue';
import useCategoryStore from '@/store/modules/category.ts';
import { ElMessage } from 'element-plus';
// 控制添加卡片的显示和隐藏
const screen=ref<number>(0);
// 存储数据
const attrList=ref<dataValue[]>([]);
// 存储新增属性值的每一个vc
const vcArr=ref<any>([]);
const categoryStore=useCategoryStore();
categoryStore.$reset();
// 获取数据方法
const getAttr=async()=>{
    const result : attrResponseData=await getAttrList(categoryStore.c1Id,categoryStore.c2Id,categoryStore.c3Id);
    if(result.code===200){
        attrList.value=result.data;  
    }
}
// 当c3Id发生变化时，发送请求
watch(()=>categoryStore.c3Id,()=>{
    attrList.value=[];
    if(categoryStore.c3Id){
        getAttr();
    }
})

// 新增属性
const addAttrValue=()=>{
    // 新增属性前清空原有数据
    Object.assign(newAttrValue,{
        attrName:'',
        categoryId:categoryStore.c3Id,//保存三级id
        categoryLevel:3,
        attrValueList:[]
    })
    
    screen.value=1;
}
// 新增属性值
const addAttrValueList=()=>{
    // 属性值为空，不能添加
    if(newAttrValue.attrName.trim()===''){
        ElMessage.warning('属性名称不能为空');
        return;
    }
    newAttrValue.attrValueList.push({
        valueName:'',
        toggle:false
    })
    // 添加属性值时，自动聚焦最后一个input
    nextTick(()=>{
        vcArr.value[newAttrValue.attrValueList.length-1].focus();
        
    })
}
// 保存新增属性值
const save=async ()=>{
    const result=await await reqAddOrUpdate(newAttrValue);
    if(result.code===200){
        screen.value=0;
        ElMessage.success('添加成功')
    }else{
        screen.value=0;
        ElMessage.error('添加失败')
    }   
    // 重新发送请求
    getAttr();
}

// 属性查看模式的切换
const toLook=(row : attrValue , $index:number)=>{
    // 如果属性值重新，不能添加
    const repeat=newAttrValue.attrValueList.find(item=>{
        if(item!==row){
            return item.valueName===row.valueName;
        }
    })
    if(repeat){
        ElMessage.warning('属性值不能重复');
        newAttrValue.attrValueList.splice($index,1);
        return;
    }

    // 新增属性值不能为空
    if(row.valueName.trim()===''){
        ElMessage.warning('属性值不能为空');
        newAttrValue.attrValueList.splice($index,1);
        return;
    }

    row.toggle=true;
}

// 属性值编辑模式切换
const toEdit=(row : attrValue , $index:number)=>{
    row.toggle=false;
    // input聚焦
    nextTick(()=>{
        vcArr.value[$index].focus();
    })
}

// 编辑按钮回调
const edit=(row:dataValue)=>{
    screen.value=1;
    // 深拷贝
    Object.assign(newAttrValue,JSON.parse(JSON.stringify(row)));
    
}
// 删除已有属性
const remove=async (attrId:number)=>{
    const result = await removeAttr(attrId);
    if(result.code===200){
        ElMessage.success('删除成功');
        getAttr();
    }else{
        ElMessage.error('删除失败');
    }
}

onBeforeUnmount(()=>{
    // 组件销毁之前把仓库数据清空
    categoryStore.$reset();
})
</script>

<style scoped></style>