// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {GET_ITEM} from '@/utils/localStore.ts'

// 创建axios实例,添加基础配置
const request=axios.create({
    // 引入环境变量中的基础路径
    baseURL:import.meta.env.VITE_APP_BASE_API ,
    // 超时时间
    timeout:5000
})

// 配置请求拦截器
request.interceptors.request.use((config)=>{
    // 带上token标识
    // console.log(config);
    config.headers.token=GET_ITEM('token');
    // 添加请求头等
    // 返回请求资源
    return config
})
// 配置响应拦截器
request.interceptors.response.use((response)=>{
    // 返回响应结果
    return response.data
},(error)=>{
    // 对失败结果进行分类
    let message=''
    let status=error.response.status
    switch(status){
        case 404:
            message='请求地址错误'
            break;
        case 401:
            message='TOKEN过期'
            break;
        case 403:
            message='无权访问'
            break;
        case 500:
            message='服务器内部错误'
            break;
        default:
            message='网络错误'
            break;
    }

    // 对错误信息处理
    ElMessage({
        type:error,
        message:message
    })
})

export default request;