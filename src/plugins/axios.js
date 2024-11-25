import axios from 'axios';
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:8000/api',
  withCredentials: true  
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const authStore = useAuthStore()
      
      const refreshed = await authStore.refreshToken()
      if (refreshed) {
        return api(originalRequest)
      }
    }
    
    return Promise.reject(error)
  }
);

export default api