export default {
  path: "/diseasePreventionRecord",
  redirect: "/diseasePreventionRecord/index",
  meta: {
    icon: "informationLine",
    title: "防病记录管理",
    rank: 9
  },
  children: [
    {
      path: "/diseasePreventionRecord/index",
      name: "diseasePreventionRecord",
      component: () => import("@/views/diseasePreventionRecord/index.vue"),
      meta: {
        title: "防病记录管理"
      }
    }
  ]
} as RouteConfigsTable;
