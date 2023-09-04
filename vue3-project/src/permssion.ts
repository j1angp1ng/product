// 路由鉴权
import router from '@/router/index.ts';
// 引入进度条工具
import nprogress from 'nprogress';
nprogress.configure({showSpinner: false});
import 'nprogress/nprogress.css';
// 获取user仓库
import pinia from '@/store/index.ts';
import useUserStore from '@/store/modules/user.ts';
const userStore=useUserStore(pinia);


// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    nprogress.start();
    const {token ,username}=userStore;
    if(token){
        // 已登录，不能访问login
        if(to.path==='/login'){
            next({path:'/'});
        }else {
            // 有用户信息才能正常访问
            if(username){
                next();
            }else{
                try{
                    await userStore.getUser();
                    // 方形之前确保路由组件已经加载完毕
                    next({...to});
                }catch(e){
                    // token过期或者token被修改
                    // 清空信息，重新登录
                    await userStore.logout();
                    next({path:'/login',query:{redirect:to.path}});
                }
            }
        }
    }else{
        // 没登陆，只能访问login
        if(to.path==='/login'){
            next();
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }
})
// 全局后置路由守卫
router.afterEach((to,from)=>{
    // 关闭进度条
    nprogress.done();
    document.title=to.meta.title as string;
})
