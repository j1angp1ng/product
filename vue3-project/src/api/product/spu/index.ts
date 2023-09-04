// 获取spu信息的请求封装
import request from '@/utils/request.ts';
import type { spuResponseData , AllTrademark , spuSaleAttr ,spuImgList , saleAttrData,skuData,skuList} from './type';

enum API{
    // 获取已有SPU信息接口
    GETSPU_URL='/admin/product/',
    // 获取全部品牌的数据
    ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    // 获取某个SPU照片墙数据
    IMAGE_URL='/admin/product/spuImageList/',
    // 获取某个spu销售属性
    SPUSALEATTRLIST_URL='/admin/product/spuSaleAttrList/',
    // 获取商品所有的销售属性
    ALLSALEATTR_URL='/admin/product/baseSaleAttrList',
    // 新增一个SPU
    ADDSPU_URL='/admin/product/saveSpuInfo',
    // 更新一个SPU
    UPDATESPU_URL='/admin/product/updateSpuInfo',
    // 添加一个新的sku
    ADDSKU_URL='/admin/product/saveSkuInfo',
    // 获取sku列表接口
    SKULIST_URL='/admin/product/findBySpuId/',
    // 删除Spu
    REMOVESPU_URL='/admin/product/deleteSpu/'
}

// 获取SPU部分信息
export const reqSPU=(page:number,limit:number,c3Id:string|number)=>request.get<any,spuResponseData>(API.GETSPU_URL+`${page}/${limit}?category3Id=${c3Id}`);
// 获取所有品牌
export const reqAllTrademark=()=>request.get<any,AllTrademark>(API.ALLTRADEMARK_URL);
// 获取某个SPU的照片墙
export const reqSpuImgList=(spuId:number)=>request.get<any,spuImgList>(API.IMAGE_URL+spuId);
// 获取某个SPU对应的销售属性
export const reqSpuSaleAttrList=(spuId:number)=>request.get<any,spuSaleAttr>(API.SPUSALEATTRLIST_URL+spuId);
// 获取SPU所有销售属性
export const reqAllSaleAttr=()=>request.get<any,saleAttrData>(API.ALLSALEATTR_URL);

// 新增或修改一个SPU
export const addOrUpdateSpu=(data:any)=>{
    if(data.id){
        return request.post(API.UPDATESPU_URL,data);
    }else{
        return request.post(API.ADDSPU_URL,data);
    }
}

// 添加一个sku
export const reqAddSku=(data:skuData)=>request.post(API.ADDSKU_URL,data);

// 获取sku列表
export const reqSkuList=(skuId:number|string)=>request.get<any,skuList>(API.SKULIST_URL+skuId);

// 删除spu
export const reqRemoveSpu=(spuId:number|string)=>request.delete<any,any>(API.REMOVESPU_URL+spuId);