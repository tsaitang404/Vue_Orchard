export default {
    path: "/harvestRecord",
    redirect: "/harvestRecord/index",
    meta: {
        icon: "informationLine",
        title: "采摘记录管理",
        rank: 9
    },
    children: [
        {
            path: "/harvestRecord/index",
            name: "harvestRecord",
            component: () => import("@/views/harvestRecord/index.vue"),
            meta: {
                title: "采摘记录管理"
            }
        }
    ]
} as RouteConfigsTable;

