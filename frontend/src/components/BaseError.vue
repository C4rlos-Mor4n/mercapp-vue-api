<script setup>
defineProps({
  message: { type: String, default: 'Ocurrió un error al cargar los datos' }
})
</script>

<template>
  <div class="base-error">
    <span class="base-error__icon">⚠️</span>
    <p class="base-error__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.base-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  color: #dc2626;
  text-align: center;
}
.base-error__icon { font-size: 2rem; }
.base-error__message { font-size: 1rem; }
</style>
