<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="main-form">
      <div class="form-section">
        <h2>User Information</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="firstname">First Name *</label>
            <input
              id="firstname"
              v-model="userData.firstName"
              type="text"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="lastname">Last Name *</label>
            <input
              id="lastname"
              v-model="userData.lastName"
              type="text"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="userData.email"
              type="email"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="password">Password *</label>
            <input
              id="password"
              v-model="userData.password"
              type="password"
              :disabled="action === 'edit'"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="userType">Type *</label>
            <select
              id="userType"
              v-model="userData.type"
              required
              class="form-input"
            >
              <option value="">Select Type</option>
              <option value="Writer">Writer</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="userStatus">Status *</label>
            <select
              id="userStatus"
              v-model="userData.status"
              required
              class="form-input"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button type="submit" class="submit-button">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const action = ref('create')

const handleSubmit = async () => {
  if (action.value === 'create') {
    await userStore.createUser()
  } else {
    await userStore.updateUser(route.params.id)
  }
  action.value = 'create'
  router.push({path: '/users'})
}

const handleFetchUser = async () => {
  await userStore.fetchUser(route.params.id)
}

onMounted(() => {
    if (route.path.includes('edit')) {
      action.value = 'edit'
      handleFetchUser()
    }
  }
)

onUnmounted(() => {
  action.value = 'create'
})
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  background-color: #f5f5f5;
}

.main-form {
  width: 100%;
  max-width: 70%;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #357abd;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

@media (max-width: 768px) {
  .main-form {
    max-width: 100%;
    padding: 1.5rem;
  }
  
  .form-section h2 {
    font-size: 1.25rem;
  }
  
  .button-container {
    justify-content: center;
  }
}
</style>