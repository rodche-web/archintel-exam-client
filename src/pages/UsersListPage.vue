<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="page-header">
        <h1 class="page-title">Users</h1>
        <button 
          @click="handleCreate" 
          class="create-button"
        >
          Create User
        </button>
      </div>
      <DataTable
        :columns="columns"
        :data="users"
        :actionHandlers="actionHandlers"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../plugins/axios'
import DataTable from '../components/DataTable.vue'

const router = useRouter()

const columns = ref([
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' }
])

const users = ref([])

const handleCreate = () => {
  router.push({path:'/users/create'})
}

const actionHandlers = {
  edit: (id) => router.push({path:`/users/edit/${id}`})
}

const fetchAllUsers = async () => {
  const response = await api.get('/user')
  users.value = response.data
}

onMounted(() => {
  fetchAllUsers()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.content-wrapper {
  width: 100%;
  max-width: 70%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  color: #333;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.create-button:hover {
  background-color: #357abd;
}

.create-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

@media (max-width: 768px) {
  .content-wrapper {
    max-width: 100%;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .create-button {
    width: 100%;
    justify-content: center;
  }
}
</style>