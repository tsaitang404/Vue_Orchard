export default {
    path: "/diseaseRecord",
    redirect: "/diseaseRecord/index",
    meta: {
        icon: "informationLine",
        title: "病害记录管理",
        rank: 9
    },
    children: [
        {
            path: "/diseaseRecord/index",
            name: "diseaseRecord",
            component: () => import("@/views/diseaseRecord/index.vue"),
            meta: {
                title: "病害记录管理"
            }
        }
    ]
} as RouteConfigsTable;

