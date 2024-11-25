<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Log In</h1>
      <p v-if="error" class="error-message">{{ error }}</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          >
        </div>

        <button 
          type="submit"
          :disabled="isLoading"
          class="login-button"
        >
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  try {
    error.value = ''
    isLoading.value = true
    
    await authStore.login({
      email: email.value,
      password: password.value
    });
    router.push('/dashboard');
    
  } catch (err) {
    error.value = 'Invalid email or password'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #4a90e2;
  outline: none;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me label {
  margin-left: 8px;
  margin-bottom: 0;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #357abd;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
}

.additional-links {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.additional-links a {
  color: #4a90e2;
  text-decoration: none;
}

.additional-links a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 10px;
  color: #ccc;
}
</style>