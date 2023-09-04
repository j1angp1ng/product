// 定义category返回的类型

export interface responseData{
    code:number,
    message:string,
    ok:boolean
}

// data字段类型
export interface dataInt{
    id:number|string,
    name:string,
    category1Id?:number,
    category2Id:number
}

// category返回的类型
export interface categoryResponseData extends responseData{
    data:dataInt[]
}

// 每一个属性值对象类型
export interface attrValue{
    id?:number,
    valueName:string,
    attrId?:number,
    toggle?:boolean
}
// 属性对象列表类型
export type attrValueList = attrValue[]
// 每一个data数组中对象类型
export interface dataValue{
    id?:number,
    attrName:string,
    categoryId:number | string,
    categoryLevel:number,
    attrValueList:attrValueList
}
// 返回属性及属性值的数据类型
export interface attrResponseData extends responseData{
    data:dataValue[]
}