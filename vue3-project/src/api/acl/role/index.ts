// role相关接口的封装
import request from '@/utils/request';
import type { roleData ,roleValue,permissionResponseData,permissionData} from './type';

enum API{
    // 获取role列表接口
    ROLELIST_URL='/admin/acl/role/',
    // 新增角色接口
    ADDROLE_URL='/admin/acl/role/save',
    // 修改角色接口
    UPDATEROLE_URL='/admin/acl/role/update',
    // 获取权限接口
    PERMISSION_URL='/admin/acl/permission/toAssign/',
    // 给角色分配权限
    ASSIGNROLE_URL='/admin/acl/permission/doAssignAcl',
    // 删除角色接口
    REMOVEROLE_URL='/admin/acl/role/remove/'
}

// 获取role接口方法
export const reqRoleList=(currentPage:number,pageSize:number,roleName:string)=>request.get<any,roleData>(API.ROLELIST_URL+`${currentPage}/${pageSize}?roleName=${roleName}`);
// 更新或新增角色
export const reqAddOrUpdate=(data:roleValue)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEROLE_URL,data);
    }else{
        return request.post<any,any>(API.ADDROLE_URL,data);
    }
}
// 获取权限
export const reqPermission=(roleId:number)=>request.get<any,permissionResponseData>(API.PERMISSION_URL+roleId);
// 给角色分配权限方法
export const reqAssign=(data:permissionData)=>request.post<any,any>(API.ASSIGNROLE_URL,data);
// 删除角色方法
export const reqRemove=(roleId:number)=>request.delete<any,any>(API.REMOVEROLE_URL+roleId);