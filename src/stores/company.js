import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../plugins/axios';

export const useCompanyStore = defineStore('company', () => {
  const companyData = ref({   
    logo: '',
    name: '',
    status: ''
  })
  
  const fetchCompany = async (companyId) => {
    try {
        const response = await api.get(`/company/${companyId}`)
        const {logo, name, status} = response.data.company
        companyData.value = {logo, name, status}
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const updateCompany = async (companyId) => {
    try {
      await api.put(`/company/${companyId}`, companyData.value)
    } catch (error) {
      alert('Error:', error);
    }
  }

  const createCompany = async () => {
    try {
      await api.post('/company', companyData.value)
    } catch (error) {
      alert('Error:', error)
    }
  }

  return {
    companyData,
    fetchCompany,
    createCompany,
    updateCompany
  };
});