// 路由的配置
export const constantRoute = [
    {
        // 登录
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Index.vue'),
        meta: {
            title: '登录',
            hidden: true,
            icon: 'Football'
        }
    },
    {
        // 主界面
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/Index.vue'),
        redirect: '/home',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/Index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'Present'
                },
            }
        ]
    },
    {
        // 404
        path: '/404',
        name: '404',
        component: () => import('@/views/404/Index.vue'),
        meta: {
            title: '404',
            hidden: true,
            icon: 'ShoppingCart'
        },
    },
    // 数据大屏
    {
        path: '/screen',
        name: 'Screen',
        component: () => import('@/views/screen/Index.vue'),
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Mic'
        }
    },
]

// 任意路由
export const anyRoute = {
    // 其他
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'other',
    component: () => import('@/views/404/Index.vue'),
    meta: {
        title: '其他',
        hidden: true,
        icon: 'Flag'
    },
}

// 异步路由，需要根据用户数据进行筛选
export const asyncRoute = [ 
    // 权限管理
    {
        path: '/acl',
        name: 'Acl',
        meta: {
            hidden: false,
            title: '权限管理',
            icon: 'Football'
        },
        redirect: '/acl/user',
        component: () => import('@/layout/Index.vue'),
        children: [
            {
                path: '/acl/user',
                name: 'User',
                component: () => import('@/views/acl/User/Index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                name: 'Role',
                component: () => import('@/views/acl/Role/Index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'Help'
                }
            },
            {
                path: '/acl/permission',
                name: 'Permission',
                component: () => import('@/views/acl/Permission/Index.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'Lock'
                }
            }
        ]
    },
    // 商品管理
    {
        path: '/product',
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'Present'
        },
        redirect: '/product/trademark',
        component: () => import('@/layout/Index.vue'),
        children: [
            {
                path: '/product/trademark',
                name: 'Trademark',
                component: () => import('@/views/product/trademark/Index.vue'),
                meta: {
                    title: '品牌管理',
                    icon: 'Goods'
                }
            },
            {
                path: '/product/attr',
                name: 'Attr',
                component: () => import('@/views/product/attr/Index.vue'),
                meta: {
                    title: '属性管理',
                    icon: 'Watch'
                }
            },
            {
                path: '/product/spu',
                name: 'Spu',
                component: () => import('@/views/product/spu/Index.vue'),
                meta: {
                    title: 'SPU管理',
                    icon: 'Stopwatch'
                }
            },
            {
                path: '/product/sku',
                name: 'Sku',
                component: () => import('@/views/product/sku/Index.vue'),
                meta: {
                    title: 'SKU管理',
                    icon: 'Handbag'
                }
            }
        ]
    }
]