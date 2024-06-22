export default {
  path: "/plot",
  redirect: "/plot/index",
  meta: {
    icon: "informationLine",
    title: "地块管理",
    rank: 9
  },
  children: [
    {
      path: "/plot/index",
      name: "plot",
      component: () => import("@/views/plot/index.vue"),
      meta: {
        title: "地块管理"
      }
    }
  ]
} as RouteConfigsTable;
