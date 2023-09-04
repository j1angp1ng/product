<template>
    <div>
    <el-card style="height:80px">
        <el-form inline class="form">
            <el-form-item label="用户名：">
                <el-input type="primary" placeholder="请输入用户名" v-model="keyword" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button  @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0px">
        <el-button type="primary" @click="addUser" v-has="`btn.User.add`">添加</el-button>
        <el-button type="primary" @click="removeMany">批量删除</el-button>
        <el-table border style="margin:10px 0px" :data="userList" @selection-change="selectChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="id" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="280px">
                <template #="{row}"> 
                    <el-button type="primary" icon="User" size="small" @click="setRole(row)" v-has="`btn.User.assign`">分配角色</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)" v-has="`btn.User.update`">编辑</el-button>
                    <el-popconfirm title="您确定要删除吗" @confirm="removeUser(row)">
                        <template #reference >
                            <el-button type="primary" icon="Delete" size="small" v-has="`btn.User.remove`">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="prev, pager, next, jumper ,-> ,sizes ,total"
        :total="total"
        @current-change="getUser()"
        @size-change="handler"
        />
    </el-card>
    <!-- 添加修改抽屉 -->
    <el-drawer v-model="isShow" >
        <template #header>
        <h4>{{ userMsg.id?'修改':'添加' }}</h4>
        </template>
        <template #default>
        <div>
            <el-form :model="userMsg" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名" v-model="userMsg.name" ></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="username">
                    <el-input placeholder="请输入用户昵称" v-model="userMsg.username" ></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userMsg.id">
                    <el-input placeholder="请输入用户密码" v-model="userMsg.password" ></el-input>
                </el-form-item>
            </el-form>
        </div>
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="isShow=!isShow">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
        </div>
        </template>
    </el-drawer>
    <!-- 分配角色抽屉 -->
    <el-drawer v-model="drawer">
        <template #header>
        <h4>分配角色</h4>
        </template>
        <template #default>
            <el-form label-width="80px">
                <el-form-item label="用户姓名">
                    <el-input v-model="userMsg.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox
                        v-model="checkAll"
                        :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange"
                        >全选</el-checkbox
                    >
                    <el-checkbox-group
                        v-model="checkedRole"
                        @change="handleCheckedRolesChange"
                    >
                        <el-checkbox v-for="(role) in userRole" :key="role.id" :label="role">{{
                        role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="drawer=!drawer">取消</el-button>
            <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
        </template>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
import {reqUserList , reqAddOrUpdate ,reqUSerRole,reqAssignRole,reqReomveOne,reqRemoveMany} from '@/api/acl/user/index.ts';
import type {userResponseData , userValue ,userRoleList,role,reqRoleData} from '@/api/acl/user/type.ts';
import { ElMessage ,FormInstance} from 'element-plus';
import {ref , onMounted ,reactive, nextTick} from 'vue';
import useLayoutStore from '@/store/setting.ts';
const layoutStore=useLayoutStore();
// 关键字
const keyword=ref<string>('');
// 当前页码
const currentPage=ref<number>(1);
// 当前页数
const pageSize=ref<number>(5);
// 全选按钮绑定值
const checkAll=ref<boolean>(false);
// 已有数据
const checkedRole=ref<role[]>([]);
// 测试数据
const userRole=ref<role[]>([]);
// 全选不确定样式
const isIndeterminate=ref<boolean>(true);

// 存储用户数据
const userList = ref<userValue[]>([]);
// 存储总页数
const total=ref<number>(0);
// 控制抽屉显示与隐藏
const isShow=ref<boolean>(false);
// 控制第二个抽屉显示与隐藏
const drawer=ref<boolean>(false);
// 表单vc
const formRef=ref<FormInstance>();
// 新增或者修改用户信息收集
const userMsg=reactive<userValue>({
    id:'',
    name:'',
    username:'',
    password:''
});
// 存储批量删除id
const idList =ref<number[]>([]);
// 表单校验规则
const validateName=(rule:any,value:any,callback:any)=>{
    if(value.trim().length>=5){
        callback();
    }else{
        callback(new Error('用户姓名长度必须大于等于5'))
    }  
}
const validateUsername=(rule:any,value:any,callback:any)=>{
    if(value.trim().length>=5){
        callback();
    }else{
        callback(new Error('用户昵称长度必须大于等于5'))
    }  
}
const validatePassword=(rule:any,value:any,callback:any)=>{
    if(value.trim().length>=6){
        callback();
    }else{
        callback(new Error('用户密码长度必须大于等于6'))
    }  
}

const rules={
    name:[{required:true,validator:validateName,trigger:'blur'}],
    username:[{required:true,validator:validateUsername,trigger:'blur'}],
    password:[{required:true,validator:validatePassword,trigger:'blur'}]
}

// 获取用户数据方法
const getUser=async()=>{
    const result : userResponseData=await reqUserList(currentPage.value,pageSize.value,keyword.value);
    if(result.code===200){
        userList.value=result.data.records;
        total.value=result.data.total;
    }
    
}
onMounted(()=>{
    getUser();
})

// 每页用户个数发生变化时的回调
const handler=()=>{
    currentPage.value=1;
    getUser();
}
// 添加用户按钮回调
const addUser=()=>{
    // 清空数据
    Object.assign(userMsg,{
        id:'',
        name:'',
        username:'',
        password:''
    })
    // 清空表单校验规则
    nextTick(()=>{
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('password');
    })
    isShow.value=true;
}
// 修改用户按钮回调
const updateUser=(row:userValue)=>{
    // 清空表单校验规则
    nextTick(()=>{
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('password');
    })
    isShow.value=true;
    Object.assign(userMsg,{
        id:row.id,
        name:row.name,
        username:row.username,
        password:row.password
    })
    
}
// 保存用户按钮回调
const save=async()=>{
    // 当所有表单校验通过后才能发送请求
    await formRef.value.validate();
    
    // 发送请求，添加一个新用户
    const result :any=await reqAddOrUpdate(userMsg);
    if(result.code===200){
        ElMessage.success(userMsg.id?'修改成功':'添加成功');
        if(userMsg.id){
            getUser();
            // 完成更新，刷新页面
            window.location.reload();
        }else{
            currentPage.value=1;
            getUser();
        }
    }else{
        ElMessage.error(userMsg.id?'修改失败':'添加失败');
    }  
    isShow.value=false;
}
// 分配角色按钮回调
const setRole=async(row:userValue)=>{
    Object.assign(userMsg,row);
    // 发送请求获取用户角色列表
    const result : userRoleList=await reqUSerRole(row.id as number);
    if(result.code===200){
        userRole.value=result.data.allRolesList;
        checkedRole.value=result.data.assignRoles;
    }
    
    drawer.value=true;
}
// 当已有的角色列表发生变化时触发
const handleCheckedRolesChange=(value:string[])=>{
    checkAll.value= value.length===userRole.value.length;
    isIndeterminate.value=value.length>0&&value.length<userRole.value.length;
}
// 全选绑定值发生变化时触发
const handleCheckAllChange=(value:boolean)=>{
    checkedRole.value= value ? userRole.value : [];
    isIndeterminate.value=false;
}
// 分配角色确认按钮回调
const confirmClick=async()=>{
    // 整合数据
    const data : reqRoleData={
        userId:(userMsg.id as number),
        roleIdList:checkedRole.value.map(item=>item.id)
    }   
    // 发送请求
    const result :any=await reqAssignRole(data);
    if(result.code===200){
        ElMessage.success('保存成功');
        drawer.value=false;
        getUser();
    }else{
        ElMessage.error('保存失败');
    }
}
// 删除一个用户
const removeUser=async(row:userValue)=>{
    const result :any= await reqReomveOne(row.id as number);
    if(result.code===200){
        ElMessage.success('删除成功');
        getUser();
    }else{
        ElMessage.error('删除失败');
    }
}
// 复选框变化时触发,删除多个用户
const selectChange=(selection:any)=>{
    idList.value=selection.map((item:any)=>item.id);
}
// 删除多个用户
const removeMany=async()=>{
    const result :any=await reqRemoveMany(idList.value);
    if(result.code===200){
        ElMessage.success('删除成功');
        getUser();
    }else{
        ElMessage.error('删除失败');
    }
}
// 重置
const reset=()=>{
    layoutStore.refresh=!layoutStore.refresh;
}
// 搜索
const search=()=>{
    getUser();
}
</script>

<style scoped>
.form{
    display:flex;
    justify-content:space-between;
    align-items: center;
}
</style>