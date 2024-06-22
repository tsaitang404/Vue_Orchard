export default {
    path: "/employee",
    redirect: "/employee/index",
    meta: {
        icon: "informationLine",
        title: "员工管理",
        rank: 9
    },
    children: [
        {
            path: "/employee/index",
            name: "employee",
            component: () => import("@/views/employee/index.vue"),
            meta: {
                title: "员工管理"
            }
        }
    ]
} as RouteConfigsTable;

