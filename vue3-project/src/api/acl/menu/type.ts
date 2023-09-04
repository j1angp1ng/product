interface responseData{
    code:number,
    message:string,
    ok:boolean
}
// 每个菜单对象的ts类型
export interface permissionValue{
    "id": number,
    "createTime": string,
    "updateTime": string,
    "pid": number,
    "name": string,
    "code": string,
    "type": number,
    "status": null,
    "level": number,
    "children": Children,
    "select": boolean
}
// 子菜单的ts类型
type Children = permissionValue[]
// 返回菜单列表的ts类型
export interface permissionResponse extends responseData{
    data:permissionValue[]
}

// 添加或修改传入data的ts类型
export interface dataInt{
    "code": string,
    "id"?: number|string,
    "level": number|string,
    "name": string,
    "pid":number|string
}