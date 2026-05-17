<template>
  <div class="not-found">
    <h1 class="not-found__code">404</h1>
    <p class="not-found__text">Página no encontrada</p>
    <router-link to="/" class="btn btn--primary">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}
.not-found__code {
  font-size: 5rem;
  color: #2563eb;
  margin: 0;
  line-height: 1;
}
.not-found__text {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0.5rem 0 1.5rem;
}
</style>
