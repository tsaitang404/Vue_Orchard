export default {
    path: "/fertilizationRecord",
    redirect: "/fertilizationRecord/index",
    meta: {
        icon: "informationLine",
        title: "施肥记录管理",
        rank: 9
    },
    children: [
        {
            path: "/fertilizationRecord/index",
            name: "fertilizationRecord",
            component: () => import("@/views/fertilizationRecord/index.vue"),
            meta: {
                title: "施肥记录管理"
            }
        }
    ]
} as RouteConfigsTable;

