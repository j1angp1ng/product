<template>
    <div>
    <el-table
      :data="permission"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column label="名称" align="center" prop="name"></el-table-column>  
      <el-table-column label="权限值" align="center" prop="code"></el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{row}">
            <el-button type="primary" size="small" :disabled="row.level===4?true:false" @click="addMenu(row)" v-has="`btn.Permission.add`">添加菜单</el-button>
            <el-button type="primary" size="small" :disabled="row.level===1?true:false" @click="update(row)" v-has="`btn.Permission.update`">编辑</el-button>
            <el-popconfirm title="您确定要删除吗?" @confirm="remove(row)">
                <template #reference>
                    <el-button type="primary" size="small" :disabled="row.level===1?true:false" v-has="`btn.Permission.remove`">删除</el-button>
                </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        v-model="dialogVisible"
        :title="menuData.id?'修改':'添加'"
        width="30%"
    >
        <el-form inline label-width="80px">
            <el-form-item label="名称">
                <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
            </el-form-item>
            <el-form-item label="权限值">
                <el-input placeholder="请输入权限值名称" v-model="menuData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">
            确定
            </el-button>
        </span>
        </template>
    </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted,reactive} from 'vue';
import { reqPermission ,reqAddOrUpdate,reqReomve} from '@/api/acl/menu';
import type {permissionValue,permissionResponse,dataInt} from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
// 菜单列表
const permission=ref<permissionValue[]>([]);
// 对话框的显示与隐藏
const dialogVisible=ref<boolean>(false);
// 存储当前菜单对象部分值
const menuData=reactive<dataInt>({
    id:'',
    code:'',
    level:'',
    name:'',
    pid:''
})

// 获取菜单列表的方法
const getPermission=async()=>{
    const result : permissionResponse=await reqPermission();
    if(result.code===200){
        permission.value=result.data;
    }
}
onMounted(()=>{
    getPermission();
})
// 添加
const addMenu=(row:permissionValue)=>{
    Object.assign(menuData,{
        id:'',
        code:'',
        level:'',
        name:'',
        pid:''
    })
    dialogVisible.value=true; 
    menuData.level=row.level+1;
    menuData.pid=row.id;
}
// 修改
const update=(row:permissionValue)=>{
    dialogVisible.value=true;
    Object.assign(menuData,{
        id:row.id,
        code:row.code,
        level:row.level,
        name:row.name,
        pid:row.pid
    })
}
// 保存
const save=async()=>{
    const result :any=await reqAddOrUpdate(menuData);
    if(result.code===200){
        ElMessage.success(menuData.id?'修改成功':'添加成功');
        getPermission();
    }else{
        ElMessage.error(menuData.id?'修改失败':'添加失败');
    }
    dialogVisible.value=false;
}
// 删除
const remove=async(row:permissionValue)=>{
    const result :any=await reqReomve(row.id);
    if(result.code===200){
        ElMessage.success('删除成功');
        getPermission();
    }else{
        ElMessage.error('删除失败');
    }
}
</script>

<style scoped>

</style>