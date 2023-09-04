<template>
    <div>
    <el-card>
        <el-form inline class="form">
            <el-form-item label="职位">
                <el-input placeholder="请输入关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin:10px 0px">
        <el-button type="primary" @click="addRole" v-has="`btn.Role.add`">添加角色</el-button>
        <el-table border style="margin:10px 0px" :data="roleList">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="id" align="center" width="100px" prop="id"></el-table-column>
            <el-table-column label="角色名称" align="center" width="180px" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" width="180px" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" width="180px" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{row}">
                    <el-button type="primary" icon="CirclePlus" size="small" @click="setPermission(row)" v-has="`btn.Role.assign`">分配权限</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="editRole(row)" v-has="`btn.Role.update`">编辑</el-button>
                    <el-popconfirm title="您确定要删除吗?" @confirm="remove(row)">
                        <template #reference>
                            <el-button type="primary" icon="Delete" size="small" v-has="`btn.Role.remove`"> 删除</el-button>
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
        layout=" prev, pager, next, jumper, ->, sizes ,total"
        :total="total"
        @current-change="getRoleList()"
        @size-change="handler"
        />
    </el-card>

    <!-- 对话框 -->
    <el-dialog
        v-model="dialogVisible"
        :title="role.roleName?'修改角色':'添加角色'"
        width="30%"
    >
        <el-form>
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称" v-model.trim="role.roleName"></el-input>
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

    <el-drawer v-model="drawer" >
        <template #header>
        <h4>分配权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree
                ref="tree"
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="selectArr"
                :props="defaultProps"
            />
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="drawer=false">取消</el-button>
            <el-button type="primary" @click="savePermission">确认</el-button>
        </div>
        </template>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted,reactive} from 'vue';
import {reqRoleList,reqAddOrUpdate,reqPermission,reqAssign,reqRemove} from '@/api/acl/role/index';
import type {roleValue,roleData,permissionResponseData,levelData,permissionData} from '@/api/acl/role/type';
import useLayoutStore from '@/store/setting';
import { ElMessage } from 'element-plus';
const layoutStore=useLayoutStore();
const currentPage=ref(1);
const pageSize=ref(5);
const total=ref(0);
// role列表
const roleList=ref<roleValue[]>([]);
// 关键字
const keyword=ref<string>('');
// 对话框显示与隐藏
const dialogVisible=ref<boolean>(false);
// 抽屉显示与隐藏
const drawer=ref<boolean>(false);
// tree组件实例
const tree=ref();
// 角色对象
const role=reactive<roleValue>({
    id:'',
    roleName:''
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const data = ref<levelData[]>([]);
const selectArr=ref<number[]>([])

// 获取role列表方法
const getRoleList=async()=>{
    const result : roleData=await reqRoleList(currentPage.value,pageSize.value,keyword.value);
    if(result.code===200){
        roleList.value=result.data.records;
        total.value=result.data.total;
    }
}
onMounted(()=>{
    getRoleList();
})
// 每页个数变化时的回调
const handler=()=>{
    currentPage.value=1;
    getRoleList();
}
//  搜索
const search=()=>{
    getRoleList();
    keyword.value='';
}
// 重置
const reset=()=>{
    layoutStore.refresh=!layoutStore.refresh;
}
// 添加角色
const addRole=()=>{
    Object.assign(role,{
        roleName:'',
        id:''
    });
    dialogVisible.value=true;
}
// 编辑角色
const editRole=(row:roleValue)=>{
    role.id=row.id;
    role.roleName=row.roleName;
    dialogVisible.value=true;
}
// 保存
const save=async()=>{
    const result:any=await reqAddOrUpdate(role);
    if(result.code===200){
        ElMessage.success(role.id?'修改成功':'添加成功');
        if(!role.id) currentPage.value=1;
        getRoleList();
    }else{
        ElMessage.error(role.id?'修改失败':'添加失败');
    }
    dialogVisible.value=false;
}
// 分配权限
const setPermission=async(row:roleValue)=>{
    drawer.value=true;
    role.id=row.id;
    const result :permissionResponseData=await reqPermission(row.id as number);
    if(result.code===200){
        data.value=result.data;
        selectArr.value=filterSelectArr(result.data,[]);
    }  
}
// 过滤4级select为真的id
const filterSelectArr=(allData:any,data:any)=>{
    allData.forEach((item:any)=>{
        if(item.children.length>0&&item.children){
            filterSelectArr(item.children,data);
        }
        if(item.select&&item.level===4){
            data.push(item.id);
        }
    })
    return data;
}
// 确认添加权限按钮
const savePermission=async()=>{
    // 整合数据
    const permissionList:permissionData={
        roleId:(role.id as number),
        permissionIdList:tree.value.getCheckedKeys()
    }
    // 发送请求
    const result :any=await reqAssign(permissionList);
    if(result.code===200){
        ElMessage.success('分配成功');
        // 因为权限改变，对应的页面也会改变，所以要刷新
        layoutStore.refresh=!layoutStore.refresh;
    }else{
        ElMessage.error('分配失败');
    }
    drawer.value=false;
}
// 删除角色
const remove=async(row:roleValue)=>{
    const result :any=await reqRemove(row.id as number);
    if(result.code===200){
        ElMessage.success('删除成功');
        getRoleList();
    }else{
        ElMessage.error('删除失败');
    }
}
</script>
<style scoped>
.form{
    display:flex;
    justify-content:space-between;
    align-items: center;
    height:40px;
}
</style>