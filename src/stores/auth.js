import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../plugins/axios'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken') || null)
  
  const isAuthenticated = computed(() => !!accessToken.value)
  
  const setAccessToken = (token) => {
    accessToken.value = token
    localStorage.setItem('accessToken', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  };
  
  const login = async (payload) => {
    try {
      const response = await api.post('/auth/login', payload)
      console.log('LOGIN', response.data)
      setAccessToken(response.data.accessToken)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('userType', response.data.userType)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }
  
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      accessToken.value = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('userType')
      delete api.defaults.headers.common['Authorization']
    }
  }
  
  const refreshToken = async () => {
    try {
      const response = await api.post('/auth/refresh-token')
      setAccessToken(response.data.accessToken)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('userType', response.data.userType)
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false;
    }
  }

  return {
    accessToken,
    isAuthenticated,
    login,
    logout,
    refreshToken
  }
})