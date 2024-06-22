export default {
    path: "/grade",
    redirect: "/grade/index",
    meta: {
        icon: "informationLine",
        title: "品级管理",
        rank: 9
    },
    children: [
        {
            path: "/grade/index",
            name: "grade",
            component: () => import("@/views/grade/index.vue"),
            meta: {
                title: "品级管理"
            }
        }
    ]
} as RouteConfigsTable;

