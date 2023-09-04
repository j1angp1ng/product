// 定义SPU相关类型

// 返回数据的共有属性定义
interface responseData {
    code: number,
    ok: boolean,
    message: string
}
// record中每一个对象的类型
export interface recordsData {
    id?: number,
    spuName: string,
    tmId: number | string,
    category3Id: number | string,
    description: string,
    spuImageList: null | SpuImg[],
    spuSaleAttrList: null | spuSale[]
}
// data中records的类型
export type Records = recordsData[]
// 返回已有spu的类型
export interface spuResponseData extends responseData {
    data: {
        records: Records,
        current: number,
        total: number,
        size: number,
        pages: number,
        searchCount: boolean
    }
}

//  品牌数据ts类型
export interface Trademark {
    id: number,
    logoUrl: string,
    tmName: string
}
// 品牌接口返回数据类型
export interface AllTrademark extends responseData {
    data: Trademark[]
}

// 商品图片ts类型
export interface SpuImg {
    id?: number,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}
// 返回spu图片的类型
export interface spuImgList extends responseData {
    data: SpuImg[]
}

// spu销售属性值对象
export interface spuSaleAttrValue {
    id?: number,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName: String,
}
// spu销售属性数组
export type spuSaleAttrList = spuSaleAttrValue[]
// 返回spu销售属性对象的类型
export interface spuSale {
    id?: number,
    flag?: boolean,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: spuSaleAttrList,
    saleAttrValue?: string
}
// 返回spu销售属性类型
export interface spuSaleAttr extends responseData {
    data: spuSale[]
}

// 返回销售属性对象的类型
export interface saleAttr {
    id: number,
    name: string
}
// 返回所有销售属性类型
export interface saleAttrData extends responseData {
    data: saleAttr[]
}

interface attr {
    "attrId": number,
    "valueId": number,
}
interface sale{
    "saleAttrId": number,
    "saleAttrValueId": number,
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
}
// 返回sku列表的数据类型
export interface skuList extends responseData{
    data:skuData[]
}
