<template>
    <div>
    <el-card class="box-card">
        <el-button type="primary" icon="Plus" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>

        <el-table border style="margin:10px 0" :data="data">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #default="{ row, $index }">
                    <img :src="row.logoUrl" style="width:100px;height:100px" alt="">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="{ row, $index }">
                    <el-button icon="Edit" size="small" type="primary" @click="editTrademark(row)" v-has="`btn.Trademark.update`"></el-button>
                    <el-popconfirm :title='`你确认要删除${row.tmName}吗?`' width="240px" @confirm="deletetrademark(row.id)">
                        <template #reference>
                        <el-button icon="Delete" size="small" type="danger" v-has="`btn.Trademark.remove`"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination 
        v-model:current-page="currentPage" 
        v-model:page-size="pageSize" 
        :page-sizes="[3, 5, 7, 9]" 
        background
        layout=" prev, pager, next, jumper , ->,sizes, total" 
        :total="total" 
        @current-change="currentChange"
        @size-change="sizeChange"
        />
    </el-card>

    <el-dialog v-model="flag" :title="trademarkData.id?'修改品牌':'添加品牌'">
        <el-form :model="trademarkData" :rules="rules" ref="trademarkForm">
            <el-form-item label="品牌名称" style="width:80%" label-width="100px" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="trademarkData.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="trademarkData.logoUrl" :src="trademarkData.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="flag = false">取消</el-button>
            <el-button type="primary" @click="confirm">
            确认
            </el-button>
        </span>
        </template>
    </el-dialog>
    </div>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus';
import type { responseData, recordsData , Records} from '@/api/product/trademark/type.ts';
import { ref, onMounted , reactive ,nextTick} from 'vue';
import { getTrademark , addOrUpdate , deleteTrademark} from '@/api/product/trademark/index.ts';
import { ElMessage } from 'element-plus';
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const data = ref<recordsData>([]);
const flag=ref<boolean>(false);
// 存储表单数据
const trademarkData=reactive<Records>({
    tmName:'',
    logoUrl:''
})
// 表单对象
const trademarkForm=ref<Records>();


// 获取数据方法
const getData = async () => {
    const result: responseData = await getTrademark(currentPage.value, pageSize.value);
    if (result.code === 200) {
        total.value = result.data.total;
        data.value = result.data.records;
    }
}
// 获取数据
onMounted(() => {
    getData();
})
// 页面发生变化时触发
const currentChange = () => {
    getData();
}
// 一页数据个数变化时触发
const sizeChange = () => {
    // 发生变化时，自动回到第一页
    currentPage.value = 1;
    getData();
}

// 添加品牌
const addTrademark=()=>{
    trademarkData.tmName='';
    trademarkData.logoUrl='';
    trademarkData.id=0;
    flag.value=true;
    // 清除校验信息
    nextTick(()=>{
        trademarkForm.value?.clearValidate('tmName');
        trademarkForm.value?.clearValidate('logoUrl');
    })
}
// 编辑品牌
const editTrademark=(row:any)=>{
    flag.value=true;
    trademarkData.tmName=row.tmName;
    trademarkData.logoUrl=row.logoUrl;
    trademarkData.id=row.id;

    // 清除校验信息
    nextTick(()=>{
        trademarkForm.value?.clearValidate('tmName');
        trademarkForm.value?.clearValidate('logoUrl');
    })
}
// 确认按钮回调
const confirm= async()=>{
    // 进行表单校验
    await trademarkForm.value?.validate();
    // 发送请求
    const result=await addOrUpdate(trademarkData);
    if(result.code===200){
        ElMessage.success(trademarkData.id?'修改成功':'添加成功');
        flag.value=false;
        getData();
    }else{
        ElMessage.error(trademarkData.id?'修改失败':'添加失败');
        flag.value=false;
    }
}

// 图片上传之前执行的函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
  // 限制上传图片的类型和大小
  if(rawFile.type==='image/png' || rawFile.type==='image/jpeg' || rawFile.type==='image/gif'){
    if(rawFile.size/1024/1024<4){
        return true;
    }else{
        ElMessage.error('上传图片应小于4M');
        return false;
    }
  }else{
    ElMessage.error('上传图片的格式必须为png或jpeg或gif');
    return false;
  }
}

// 上传图片成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response:any,uploadFile) => {
    trademarkData.logoUrl=response.data;
    trademarkForm.value?.clearValidate('logoUrl');
}

// 表单校验
const validateTmname=(rule:any,value:any,callback:any)=>{
    if(value.trim().length>=2){
        callback();
    }else{
        callback(new Error('品牌名称必须大于等于2'))
    }   
}
const validateLogourl=(rule:any,value:any,callback:any)=>{
    if(value!==''){
        callback();
    }else{
        callback(new Error('品牌图片不能为空'))
    }
}
const rules={
    tmName:[
        {required:true,trigger:'blur',validator:validateTmname}
    ],
    logoUrl:[
        {required:true,validator:validateLogourl}
    ]
}

// 气泡确认框按钮回调
const deletetrademark=async (id:number)=>{
    const result=await deleteTrademark(id);
    if(result.code===200){
        ElMessage.success('删除成功');
        getData();
    }else{
        ElMessage.error('删除失败');
    }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>