export default {
    path: "/irrigationRecord",
    redirect: "/irrigationRecord/index",
    meta: {
        icon: "informationLine",
        title: "灌溉记录管理",
        rank: 9
    },
    children: [
        {
            path: "/irrigationRecord/index",
            name: "irrigationRecord",
            component: () => import("@/views/irrigationRecord/index.vue"),
            meta: {
                title: "灌溉记录管理"
            }
        }
    ]
} as RouteConfigsTable;

