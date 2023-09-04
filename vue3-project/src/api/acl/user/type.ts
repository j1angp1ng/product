// 用户相关ts类型

interface responseData{
    code:number,
    message:string,
    ok:boolean
}

// user对象ts类型
export interface userValue{
    id?: number|string,
    username: string,
    password: string,
    name: string,
    phone?: string,
    roleName?: string,
    createTime?:string,
    updateTime?:string
}
export type Records=userValue[]

// 返回用户数据的ts类型
export interface userResponseData extends responseData{
    data:{
        records:Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

// 用户角色对象的ts类型
export interface role{
    id: number,
    createTime: string,
    updateTime: string,
    roleName: string,
}
// 返回获取用户角色接口的ts类型
export interface userRoleList extends responseData{
    data:{
        assignRoles:role[],
        allRolesList:role[]
    }
}

// 为用户分配角色请求数据得ts类型
export interface reqRoleData{
    userId:number,
    roleIdList:number[]
}