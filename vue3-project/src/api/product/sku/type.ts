// 返回sku数据的ts类型

interface responseData{
    code:number,
    message:string,
    ok:boolean
}

interface attr {
    id?:number,
    "attrId": number,
    "valueId": number,
    valueName:string
}
interface sale{
    "saleAttrId": number,
    "saleAttrValueId": number,
    saleAttrValueName:string,
    id:number
}
// 收集sku数据的ts类型
export interface skuData {
    "skuName": string,
    "category3Id": number|string,
    "price": number|string,
    "skuDefaultImg": string,
    "skuDesc": string,
    "spuId": number|string,
    "tmId": number|string,
    "weight": string|string,
    "skuAttrValueList": attr[],
    "skuSaleAttrValueList": sale[],
    isSale?:number|string,
    id?:number|string
}

// 返回sku数据类型
export interface skuResponseData extends responseData{
    data:{
        records:skuData[],
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}

// 返回sku详细信息的ts类型
export interface skuDetailData extends responseData{
    data:skuData
}