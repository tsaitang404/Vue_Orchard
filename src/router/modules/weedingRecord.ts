export default {
    path: "/weedingRecord",
    redirect: "/weedingRecord/index",
    meta: {
        icon: "informationLine",
        title: "除草记录管理",
        rank: 9
    },
    children: [
        {
            path: "/weedingRecord/index",
            name: "weedingRecord",
            component: () => import("@/views/weedingRecord/index.vue"),
            meta: {
                title: "除草记录管理"
            }
        }
    ]
} as RouteConfigsTable;

