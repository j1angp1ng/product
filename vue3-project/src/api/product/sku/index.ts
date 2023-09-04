// 请求sku相关接口的封装
import request from '@/utils/request.ts';
import type { skuResponseData } from './type';

enum API{
    // 获取已有sku列表的接口
    SKULIST_URL='/admin/product/list/',
    // 商品上架接口
    SALE_URL='/admin/product/onSale/',
    // 商品下架接口
    UNSALE_URL='/admin/product/cancelSale/',
    // 获取某个sku信息
    GETSKU_URL='/admin/product/getSkuInfo/',
    // 删除一个sku
    REMOVESKU_URL='/admin/product/deleteSku/'
}

export const reqSkuList=(pageNo:number,pageSize:number)=>request.get<any,skuResponseData>(API.SKULIST_URL+`${pageNo}/${pageSize}`);
export const reqSale=(skuId:number)=>request.get<any,any>(API.SALE_URL+skuId);
export const reqUnSale=(skuId:number)=>request.get<any,any>(API.UNSALE_URL+skuId);
export const reqSku=(skuId:number)=>request.get(API.GETSKU_URL+skuId);
export const reqRemoveSku=(skuId:number)=>request.delete(API.REMOVESKU_URL+skuId);