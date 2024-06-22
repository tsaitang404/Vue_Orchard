export default {
  path: "/tree",
  redirect: "/tree/index",
  meta: {
    icon: "informationLine",
    title: "果树管理",
    rank: 9
  },
  children: [
    {
      path: "/tree/index",
      name: "tree",
      component: () => import("@/views/tree/index.vue"),
      meta: {
        title: "果树管理"
      }
    }
  ]
} as RouteConfigsTable;
