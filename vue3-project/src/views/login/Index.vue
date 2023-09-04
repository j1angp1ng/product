<template>
    <div class="login_container">
        <el-row >
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="fromData" :rules="rules" ref="loginFormRef">
                    <h1>Hello</h1>
                    <h2>欢迎使用</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="fromData.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" 
                        :prefix-icon="Lock" 
                        v-model="fromData.password" 
                        show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 引入图标
import { User, Lock } from '@element-plus/icons-vue';
import { reactive ,ref} from 'vue';
import { useRouter ,useRoute } from 'vue-router';
// 引入小仓库
import useUserStore from '@/store/modules/user.ts';
import { ElNotification } from 'element-plus';
// 获取当前时间
import getTime from '@/utils/time.ts';
const {query}:any=useRoute();

// 自定义校验规则
const userNameValidate=(rule:any,value:any,callback:any)=>{
    if(value.length>=5&& value.length<=10){
        callback();
    }else{
        callback(new Error('账号长度为5-10位！'));
    }
}
const passwordValidate=(rule:any,value:any,callback:any)=>{
    if(value.length>=6&& value.length<=12){
        callback();
    }else{
        callback(new Error('密码长度为6-12位！'));
    }
}

// 获取表单组件
let loginFormRef=ref();
const $router = useRouter();
const fromData = reactive({
    username: 'admin',
    password: 'atguigu123'
})
// 表单校验规则
const rules = {
    username: [
        // { required: true, min: 5, max: 10, message: '账号长度为5-10位', trigger: 'change' }
        {required:true,validator:userNameValidate}
    ],
    password: [
        // { required: true, min: 6, max: 12, message: '密码长度为6-12位', trigger: 'change' }
        {required:true,validator:passwordValidate}
    ]
}
const userStore = useUserStore();
// 登录按钮回调
const login =async () => {
    // 表单校验通过才发送请求
    await loginFormRef.value.validate();
    
    // const result=await loginForm.validate();
    // console.log(result);
    
    userStore.userLogin(fromData).then(() => {
        // 跳转页面
        // 判断是否有query
        $router.push({path:query.redirect || '/'});
        // 提示信息
        ElNotification.success({
            title: `Hi,${getTime()}好！`,
            message: '登录成功'
        });
    }, (err) => {
        ElNotification.error(err.message);
    })

}
</script>

<style scoped lang="scss">
.login_container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    overflow:hidden;

    .login_form {
        width: 80%;
        margin: 30vh 0px;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 20px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%
        }
    }

}
</style>