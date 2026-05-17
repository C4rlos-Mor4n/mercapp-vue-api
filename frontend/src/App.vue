<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main class="main-content">
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="loading-full">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 70px;
  min-height: 100vh;
}
.loading-full {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
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
