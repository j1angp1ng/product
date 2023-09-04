// 封建品牌接口
import request from '@/utils/request.ts';
import type { responseData ,Records} from './type';

enum API{
    // 获取品牌接口
    getTrademarkURL='/admin/product/baseTrademark/',
    // 新增品牌接口
    addTrademarkURL='/admin/product/baseTrademark/save',
    // 修改品牌接口
    updateTrademarkURL='/admin/product/baseTrademark/update',
    // 删除品牌接口
    deleteTrademaekURL='/admin/product/baseTrademark/remove/'
}

// 获取品牌信息
export const getTrademark=(currentPage:number,pageSize:number)=>request.get<any,responseData>(API.getTrademarkURL+`${currentPage}/${pageSize}`);

// 新增与修改品牌信息
export const addOrUpdate=(data:Records)=>{
    // id存在表示修改，不存在表示新增
    if(data.id){
        return request.put(API.updateTrademarkURL,data);
    }else{
        return request.post(API.addTrademarkURL,data);
    }
}

// 删除品牌
export const deleteTrademark=(id:number)=>request.delete(API.deleteTrademaekURL+id);