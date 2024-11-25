import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../plugins/axios';

export const useUserStore = defineStore('user', () => {
  const userData = ref({   
    firstName: '',
    lastName: '',
    type: '',
    status: '',
    email: '',
    password: '',
  })
  
  const fetchUser = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}`)
        const {firstName, lastName, type, status, email, password} = response.data
        userData.value = {firstName, lastName, type, status, email, password}
    } catch (error) {
        alert('Error:', error);
    }
  }

  const updateUser = async (userId) => {
    try {
      delete userData.value.type
      await api.put(`/user/${userId}`, userData.value)
    } catch (error) {
      alert('Error:', error);
    }
  }

  const createUser = async () => {
    try {
      const response = await api.post('/auth/register', userData.value)
    } catch (error) {
      alert('Error:', error)
    }
  }

  return {
    userData,
    fetchUser,
    updateUser,
    createUser
  };
});