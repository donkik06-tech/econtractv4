import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
      path:"/",
      name: "Home",
      component: ()=>import("@/components/HelloWorld.vue")
  },
  {
    path: "/contracts",
    name: "Contracts",
    children: [
      {
        path: "",
        name: "contract-index",
        component: () => import("@/components/ContractsIndex.vue"),
      },

      {
        path:"kaban",
        name: "kaban",
        component: ()=>import("@/components/contracts/ContractUpdate.vue")
      }
    ],
  },

  {
    path: "/companies",
    name: "company-index",
    component: () => import("@/components/CompaniesIndex.vue"),
  },

  {
    path: "/reports",
    name: "report-index",
    component: () => import("@/components/ReportIndex.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
