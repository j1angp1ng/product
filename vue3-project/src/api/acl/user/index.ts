import request from '@/utils/request.ts';
import type { userResponseData , userValue ,userRoleList,reqRoleData} from './type';

enum API{
    // 用户列表接口
    USERLIST_URL='/admin/acl/user/',
    // 新增一个用户
    ADDUSER_URL='/admin/acl/user/save',
    // 修改已有用户信息
    UPDATEUSER_URL='/admin/acl/user/update',
    // 根据用户id获取对应角色接口
    USERROLE_URL='/admin/acl/user/toAssign/',
    // 根据用户分配角色接口
    ASSIGNROLE_URL='/admin/acl/user/doAssignRole',
    // 删除用户接口
    REMOVEONE_URL='/admin/acl/user/remove/',
    // 批量删除用户接口
    REMOVEMANY_URL='/admin/acl/user/batchRemove',
}

export const reqUserList=(pageNo:number,pageSize:number,username:string)=>request.get<any,userResponseData>(API.USERLIST_URL+`${pageNo}/${pageSize}?username=${username}`);

export const reqAddOrUpdate=(data:userValue)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data);
    }else{
        return request.post<any,any>(API.ADDUSER_URL,data);
    }
}

export const reqUSerRole=(userId:number)=>request.get<any,userRoleList>(API.USERROLE_URL+userId);

export const reqAssignRole=(data:reqRoleData)=>request.post<any,any>(API.ASSIGNROLE_URL,data);

export const reqReomveOne=(userId:number)=>request.delete<any,any>(API.REMOVEONE_URL+userId);

export const reqRemoveMany=(userIdList:number[])=>request.delete<any,any>(API.REMOVEMANY_URL,{data:userIdList});