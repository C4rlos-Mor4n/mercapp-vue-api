<script setup>
defineProps({ message: String })
</script>

<template>
  <div class="base-loader">
    <div class="spinner"></div>
    <p>{{ message || 'Cargando...' }}</p>
  </div>
</template>

<style scoped>
.base-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1rem;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
