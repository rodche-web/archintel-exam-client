<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th class="action-column">Actions</th>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item._id">
          <td class="action-column">
            <div class="action-buttons">
              <button 
                @click="actionHandlers.edit(item._id)"
                class="action-button edit-button"
              >
                Edit
              </button>
            </div>
          </td>
          <td v-for="column in columns" :key="column.key">
            <template v-if="column.isImage">
              <img 
                :src="item[column.key]" 
                :alt="`${column.label} thumbnail`"
                class="thumbnail"
              />
            </template>
            <template v-else-if="column.isLink">
              <a 
                :href="item[column.key]"
                target="_blank"
                class="table-link"
              >
                {{ item[column.key] }}
              </a>
            </template>
            <template v-else>
              {{ item[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  actionHandlers: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #444;
}

.action-column {
  width: 160px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-button {
  background-color: #4a90e2;
  color: white;
}

.edit-button:hover {
  background-color: #357abd;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.table-link {
  color: #4a90e2;
  text-decoration: none;
}

.table-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .data-table {
    font-size: 0.875rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem;
  }
  
  .action-column {
    width: 140px;
  }
  
  .action-button {
    padding: 0.4rem 0.8rem;
  }
}
</style>