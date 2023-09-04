// 定义用户接口的数据类型

// 定义用户登录参数类型
export interface loginFormData{
    username:string,
    password:string
}

// 接口返回数据类型
interface responseData{
    code:number,
    message:string,
    ok:boolean
}

// 用户登录返回数据类型
export interface loginResponseData extends responseData{
    data:string
}

// 请求用户信息返回数据类型
export interface infoResponseData extends responseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}

// 退出登录返回数据类型
/* export interface logoutResponseData extends responseData{
    data:null
} */