<template>
  <nav 
    class="drawer"
    :class="{ 'drawer-open': isOpen }"
    v-if="authStore.isAuthenticated"
  >
    <!-- Drawer Header -->
    <div class="drawer-header">
      <div class="user-info" v-if="isOpen">
        <div class="user-avatar">
          {{ userInitials }}
        </div>
        <div class="user-details">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
      <button 
        class="toggle-button"
        @click="toggleDrawer"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      >
        <svg 
          class="toggle-icon"
          :class="{ 'rotate-180': !isOpen }"
          width="20" 
          height="20" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="nav-links" v-if="isOpen">
      <router-link 
        v-for="link in navigationLinks" 
        :key="link.path"
        :to="link.path"
        class="nav-link"
        :class="{ active: currentRoute === link.path }"
      >
        <span class="nav-icon" v-html="link.icon"></span>
        <span class="nav-text" v-if="isOpen">{{ link.name }}</span>
      </router-link>
    </div>

    <!-- Logout Button -->
    <div class="drawer-footer" v-if="isOpen">
      <button 
        class="logout-button"
        @click="handleLogout"
      >
        <span class="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </span>
        <span class="nav-text" v-if="isOpen">Log out</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';

// Router
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State
const isOpen = ref(true)
const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})

const currentRoute = computed(() => route.path)

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
})

const navigationLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  },
  {
    name: 'Users',
    path: '/users',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    name: 'Articles',
    path: '/articles',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
  },
  {
    name: 'Companies',
    path: '/companies',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>'
  }
]

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  width: 70px;
  z-index: 1000;
}

.drawer-open {
  width: 250px;
}

.drawer-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-details {
  overflow: hidden;
}

.user-details h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.user-details p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  border-radius: 4px;
}

.toggle-button:hover {
  background-color: #f5f5f5;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.nav-links {
  flex: 1;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.nav-link.active {
  background-color: #e6f0fa;
  color: #4a90e2;
}

.nav-icon {
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-footer {
  padding: 16px;
  border-top: 1px solid #eee;
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .drawer {
    width: 0;
  }
  
  .drawer-open {
    width: 250px;
  }
}
</style>