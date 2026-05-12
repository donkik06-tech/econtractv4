import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '@/views/HomeView.vue'
// import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/contracts',
    name: 'contract-index',
    component: () => import('@/components/ContractsIndex.vue'),
  },

  {
    path: '/companies',
    name: 'company-index',
    component: () => import('@/components/CompaniesIndex.vue'),
  },

  
  {
    path: '/reports',
    name: 'report-index',
    component: () => import('@/components/ReportIndex.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
