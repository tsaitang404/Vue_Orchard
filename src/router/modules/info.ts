export default {
  path: "/info",
  redirect: "/info/index",
  meta: {
    icon: "setting",
    title: "个人信息",
    rank: 1
  },
  children: [
    {
      path: "/info/index",
      name: "Info",
      component: () => import("@/views/user/info.vue"),
      meta: {
        title: "个人信息",
        roles: ["管理员"]
      }
    }
  ]
} as RouteConfigsTable;
