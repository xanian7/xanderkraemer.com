import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesView.vue')
    },
    {
      path: '/games/sandbox',
      name: 'sandbox',
      component: () => import('../views/Sandbox.vue')
    },
    {
      path: '/games/gravitydraw',
      name: 'gravitydraw',
      component: () => import('../views/GravityDraw.vue')
    },
    {
      path: '/background',
      name: 'background',
      component: () => import('../views/GamesBackground.vue')
    },
    {
      path: '/games/randomnumbers',
      name: 'randomnumbers',
      component: () => import('../views/RandomNumberGame.vue')
    }
  ]
})

export default router
