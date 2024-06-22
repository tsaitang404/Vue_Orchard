export default {
    path: "/pestRecord",
    redirect: "/pestRecord/index",
    meta: {
        icon: "informationLine",
        title: "虫害记录管理",
        rank: 9
    },
    children: [
        {
            path: "/pestRecord/index",
            name: "pestRecord",
            component: () => import("@/views/pestRecord/index.vue"),
            meta: {
                title: "虫害记录管理"
            }
        }
    ]
} as RouteConfigsTable;

