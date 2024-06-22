export default {
    path: "/pestPreventionRecord",
    redirect: "/pestPreventionRecord/index",
    meta: {
        icon: "informationLine",
        title: "防虫记录管理",
        rank: 9
    },
    children: [
        {
            path: "/pestPreventionRecord/index",
            name: "pestPreventionRecord",
            component: () => import("@/views/pestPreventionRecord/index.vue"),
            meta: {
                title: "防虫记录管理"
            }
        }
    ]
} as RouteConfigsTable;

