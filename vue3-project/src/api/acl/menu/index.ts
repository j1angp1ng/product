import request from '@/utils/request';
import type {permissionResponse,dataInt} from './type';

enum API{
    // 获取菜单列表
    PERMISSION_URL='/admin/acl/permission',
    // 新增菜单接口
    ADDPERMISSION_URL='/admin/acl/permission/save',
    // 修改菜单接口
    UPDATEPERMISSION_URL='/admin/acl/permission/update',
    // 删除菜单
    REMOVEPERMISSION_URL='/admin/acl/permission/remove/'
}

// 获取菜单列表方法
export const reqPermission=()=>request.get<any,permissionResponse>(API.PERMISSION_URL);
// 新增或修改菜单的方法
export const reqAddOrUpdate=(data:dataInt)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEPERMISSION_URL,data);
    }else{
        return request.post<any,any>(API.ADDPERMISSION_URL,data);
    }
}
// 删除菜单方法
export const reqReomve=(id:number)=>request.delete<any,any>(API.REMOVEPERMISSION_URL+id);