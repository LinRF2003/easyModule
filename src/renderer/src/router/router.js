import { createRouter, createWebHistory } from 'vue-router'

// 定义路由
const routes = [
  {
    path: '/',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/randomNum',
    component: () => import('../pages/RandomNum.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
