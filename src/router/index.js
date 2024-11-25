import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    component: () => import('../pages/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/articles',
    component: () => import('../pages/AllMediaRoot.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../pages/ArticlesListPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create',
        component: () => import('../pages/ArticleFormPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'edit/:id',
        component: () => import('../pages/ArticleFormPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/companies',
    component: () => import('../pages/AllMediaRoot.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../pages/CompaniesListPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create',
        component: () => import('../pages/CompanyFormPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'edit/:id',
        component: () => import('../pages/CompanyFormPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/users',
    component: () => import('../pages/AllMediaRoot.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../pages/UsersListPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create',
        component: () => import('../pages/UserFormPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'edit/:id',
        component: () => import('../pages/UserFormPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.path === '/') {
    next(authStore.isAuthenticated ? '/dashboard' : '/login')
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router