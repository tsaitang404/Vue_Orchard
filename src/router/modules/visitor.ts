export default {
    path: "/visitor",
    redirect: "/visitor/index",
    meta: {
        icon: "informationLine",
        title: "游客管理",
        rank: 9
    },
    children: [
        {
            path: "/visitor/index",
            name: "visitor",
            component: () => import("@/views/visitor/index.vue"),
            meta: {
                title: "游客管理"
            }
        }
    ]
} as RouteConfigsTable;

