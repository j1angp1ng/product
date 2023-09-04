// 引入createRouter创建路由器并进行配置
import {createRouter ,createWebHashHistory} from 'vue-router';
// 引入路由规则
import {constantRoute} from './routes.ts'

// 创建路由器
const router=createRouter({
    // 工作模式为hash
    history:createWebHashHistory(),
    routes:constantRoute,
    // 滚动行为
    scrollBehavior(){
        return{
                left:0,
                top:0
        }
    }
})

export default router;
