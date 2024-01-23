import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LayoutView.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: '/',
          name: 'login',
          component: () => import('@/views/AuthView/LoginView.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/AuthView/RegisterView.vue'),
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/playground',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'todo',
          component: () => import('@/views/DashboardView/ToDoView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/DashboardView/SettingsView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ],
  linkExactActiveClass: 'active'
})

// Router Guard
router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser()

  if (to.meta.requiresAuth) {
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        name: 'login',
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath
        }
      }
    }
  }
})

export default router
