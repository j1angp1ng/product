// 引入
import { defineStore } from 'pinia';
import { loginRequest, userinfoRequest, logoutRequest } from '@/api/user/index.ts';
import type { stateInt } from '@/api/types/type.ts';
import type {loginFormData ,loginResponseData,infoResponseData} from '@/api/user/type.ts'
// 本地存储操作
import { GET_ITEM, SET_ITEM, REMOVE_ITEM } from '@/utils/localStore.ts';
// 引入路由配置
import { constantRoute ,asyncRoute,anyRoute} from '@/router/routes.ts';
import router from '@/router';
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep';

// 过滤路由的方法
const filterAsyncRoutes=(asyncRoutes:any,result:any)=>{
    return asyncRoutes.filter((item:any)=>{
        if(result.includes(item.name)){
            if(item.children&&item.children.length>0){
                item.children=filterAsyncRoutes(item.children,result);
            }
            return true;
        }
    })
}
let userRoutes:any=[];

// 创建小仓库
const useUserStore = defineStore('User', {

    // 存储数据
    state: (): stateInt => {
        return {
            // 从本地中取出token
            token: GET_ITEM('token'),
            // 存储路由信息
            routeList: constantRoute,
            username: '',
            avatar: '',
            buttons:[]
        }
    },
    // 异步处理
    actions: {
        // 用户登录方法
        async userLogin(data: loginFormData) {
            const result: loginResponseData = await loginRequest(data);
            // 判断是否登录成功
            if (result.code === 200) {
                // 对token进行存储
                this.$state.token = result.data as string;
                SET_ITEM('token', (result.data as string));
                return "ok";
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        // 获取用户信息
        async getUser() {
            const result : infoResponseData = await userinfoRequest();
            // 获取数据并存入仓库
            // console.log(result.data.checkUser);
            // 请求成功时存储
            const { avatar, name } = result.data;
            if (result.code === 200) {
                this.username = name;
                this.avatar = avatar;

                userRoutes=filterAsyncRoutes(cloneDeep(asyncRoute),result.data.routes);
                // console.log([...userRoutes,...constantRoute,anyRoute]);
                this.routeList=[...constantRoute,...userRoutes,anyRoute];
                // 将过滤合并后的路由逐一添加到路由器中
                [...userRoutes,anyRoute].forEach((item:any)=>{
                    router.addRoute(item);
                })
                this.buttons=result.data.buttons;
                // console.log(result.data);
                
                return 'ok';
            } else {
                return Promise.reject('获取用户信息失败');
            }
        },
        // 退出登录
        async logout() {
            const result :any = await logoutRequest();
            if (result.code === 200) {
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_ITEM();
                userRoutes.forEach((item:any)=>{
                    router.removeRoute(item.name);
                })
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message));
            }

        }
    },
    getters: {

    }
})

export default useUserStore;