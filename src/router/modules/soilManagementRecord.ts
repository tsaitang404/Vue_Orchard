export default {
    path: "/soilManagementRecord",
    redirect: "/soilManagementRecord/index",
    meta: {
        icon: "informationLine",
        title: "土壤管理记录管理",
        rank: 9
    },
    children: [
        {
            path: "/soilManagementRecord/index",
            name: "soilManagementRecord",
            component: () => import("@/views/soilManagementRecord/index.vue"),
            meta: {
                title: "土壤管理记录管理"
            }
        }
    ]
} as RouteConfigsTable;

