export default {
    path: "/pruningRecord",
    redirect: "/pruningRecord/index",
    meta: {
        icon: "informationLine",
        title: "修剪记录管理",
        rank: 9
    },
    children: [
        {
            path: "/pruningRecord/index",
            name: "pruningRecord",
            component: () => import("@/views/pruningRecord/index.vue"),
            meta: {
                title: "修剪记录管理"
            }
        }
    ]
} as RouteConfigsTable;

