// role相关ts类型

interface responseData{
    code:number,
    message:string,
    ok:boolean
}

// role对象ts类型
export interface roleValue{
    id?: number|string,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark?: null
}
type Records=roleValue[]
// 返回role列表的ts类型
export interface roleData extends responseData{
    data:{
        records:Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

// 每个子菜单按钮权限的ts类型
export interface levelData{
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children?: childrenData[],
    select: boolean
}
// children的ts类型
type childrenData=levelData[]
// 返回权限接口的ts类型
export interface permissionResponseData extends responseData{
    data:levelData[]
}

// 为角色分配权限时传入的data类型
export interface permissionData{
    roleId:number|string,
    permissionIdList:number[]
}