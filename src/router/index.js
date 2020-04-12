import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export const defaultRouterMap = [
    {
        path: "/",
        redirect: "login",
        hidden: true,
    },
    {
        path: "/login",
        name: "login",
        hidden: true,
        component: () => import("@/views/Login/index.vue")
    },
    {
        path: "/index",
        name: "index",
        redirect: "goods",
        hidden: true,
        component: () => import("@/views/Main/index.vue")
    },
    {
        path: "/goods",
        name: "goods",
        child: true,
        hidden: false,
        redirect: "goodsItems",
        meta: {
            name: '产品管理',
            icon: 'international',
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/goodsItems",
                name: "goodsItems",
                meta: {
                    name: '产品类别',
                    keepalive:true
                },
                component: () => import("../views/Content/goods/goodsItems.vue")
            }, {
                path: "/goodsInfo",
                name: "goodsInfo",
                meta: {
                    name: '产品信息',
                    keepalive:true
                },
                component: () => import("../views/Content/goods/goodsInfo.vue")
            },
        ]
    },
    {
        path: "/news",
        name: "news",
        child: true,
        meta: {
            name: '新闻管理',
            icon: 'calculator'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/newsItems",
                name: "newsItems",
                meta: {
                    name: '新闻类别',
                    keepalive:true
                },
                component: () => import("../views/Content/news/newsItems.vue")
            }, {
                path: "/newsInfo",
                name: "newsInfo",
                meta: {
                    name: '新闻信息',
                    keepalive:true
                },
                component: () => import("../views/Content/news/newsInfo.vue")
            }],
    },
    {
        path: "/casetype",
        name: "casetype",
        child: true,
        meta: {
            name: '案例管理',
            icon: 'filter'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/casetypeItems",
                name: "casetypeItems",
                meta: {
                    name: '案例类别',
                    keepalive:true
                },
                component: () => import("../views/Content/casetype/casetypeItems.vue")
            }, {
                path: "/casetypeInfo",
                name: "casetypeInfo",
                meta: {
                    name: '案例信息',
                    keepalive:true
                },
                component: () => import("../views/Content/casetype/casetypeInfo.vue")
            }],
    },
    {
        path: "/contact",
        name: "contact",
        child: false,
        redirect: "contactindex",
        meta: {
            name: '联系方式管理',
            icon: 'discount'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/contactindex",
                name: "contactindex",
                meta: {
                    name: '联系方式管理',
                    keepalive:true
                },
                component: () => import("../views/Content/contact")
            }],


    },
    {
        path: "/about",
        name: "about",
        child: false,
        redirect: "aboutindex",
        meta: {
            name: '关于我们管理',
            icon: 'edit'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/aboutindex",
                name: "aboutindex",
                meta: {
                    name: '关于我们管理',
                    keepalive:true
                },
                component: () => import("../views/Content/about")
            }],
    }, {
        path: "/admin",
        name: "admin",
        child: false,
        hidden: true,
        redirect: "adminindex",
        meta: {
            name: '管理员管理',
            icon: 'order'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/adminindex",
                name: "adminindex",
                meta: {
                    name: '管理员管理',
                    keepalive:true
                },
                component: () => import("../views/Content/admin")
            }],
    }
]
export default new Router({
    routes: defaultRouterMap
});

export const asyncRouterMap = [
    {
        path: "/admin",
        name: "admin",
        child: false,
        redirect: "adminindex",
        meta: {
            name: '管理员管理',
            icon: 'order'
        },
        component: () => import("@/views/Main/index.vue"),
        children: [
            {
                path: "/adminindex",
                name: "adminindex",
                meta: {
                    name: '管理员管理'
                },
                component: () => import("../views/Content/admin")
            }],
    }
]
