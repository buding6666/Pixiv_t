import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import Boutique from '@/views/home/compcents/boutique.vue'
import New from '@/views/home/compcents/new.vue'
import Ranking from '@/views/home/compcents/ranking.vue'
import Recommend from '@/views/home/compcents/recommend.vue'
import Hot from '@/views/home/compcents/hot.vue'
import Search from '@/views/home/compcents/search.vue'
import Particulars from '@/views/home/compcents/particulars.vue'
import Login from '@/views/login/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'boutique',
          component: Boutique
        },
        {
        path: 'new',
        component: New
        },
        {
          path: 'ranking',
          component: Ranking
        },
        {
          path: 'hot',
          component: Hot
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'search',
          component: Search
        },
        {
          path: '/particulars/:pid/:uid/:author',
          component: Particulars
        }
      ]

    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
