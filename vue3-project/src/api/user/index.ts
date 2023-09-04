// 统一封装user的接口
import request from '@/utils/request.ts'
import type {loginFormData ,loginResponseData,infoResponseData} from './type.ts'
// 用户请求的相关地址
enum API{ 
    LOGIN_URL='/admin/acl/index/login',
    USERINFO_URL='/admin/acl/index/info',
    LOGOUT_URL='/admin/acl/index/logout'
}

// 用户登录接口
export const loginRequest=(data:loginFormData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)

// 获取用户信息接口
export const userinfoRequest=()=>request.get<any,infoResponseData>(API.USERINFO_URL)

// 退出登录
export const logoutRequest=()=>request.post<any,any>(API.LOGOUT_URL);