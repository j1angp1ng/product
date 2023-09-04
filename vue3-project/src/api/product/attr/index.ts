// 管理商品属性接口封装
import request from  '@/utils/request.ts';
import type { categoryResponseData , attrResponseData , dataValue} from './type'; 

enum API{
    // 获取一级分类接口
    C1_URL='/admin/product/getCategory1',
    // 获取二级级分类接口
    C2_URL='/admin/product/getCategory2/',
    // 获取三级分类接口
    C3_URL='/admin/product/getCategory3/',
    // 获取属性接口
    ATTRLIST_URL='/admin/product/attrInfoList/',
    // 新增或修改属性值接口
    ADDORUPDATE_URL='/admin/product/saveAttrInfo',
    // 删除已有属性接口
    REMOVE_URL='/admin/product/deleteAttr/'
}

export const getC1=()=>request.get<any,categoryResponseData>(API.C1_URL);
export const getC2=(c1Id:number | string)=>request.get<any,categoryResponseData>(API.C2_URL+c1Id);
export const getC3=(c2Id:number | string)=>request.get<any,categoryResponseData>(API.C3_URL+c2Id);
export const getAttrList=(c1Id:number|string,c2Id:number|string,c3Id:number|string)=>request.get<any,attrResponseData>(API.ATTRLIST_URL+c1Id+`/${c2Id}`+`/${c3Id}`);
export const reqAddOrUpdate=(data:dataValue)=>request.post<any,any>(API.ADDORUPDATE_URL,data);
export const removeAttr=(attrId:number)=>request.delete(API.REMOVE_URL+attrId);