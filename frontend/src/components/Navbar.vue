<script setup>
import { useCartStore } from '../stores/cart.store.js'
const cartStore = useCartStore()
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <router-link to="/" class="navbar__brand">MercApp</router-link>
      <nav class="navbar__links">
        <router-link to="/" class="navbar__link">Catálogo</router-link>
        <router-link to="/about" class="navbar__link">Acerca de</router-link>
        <router-link to="/cart" class="navbar__link navbar__cart">
          Carrito
          <span v-if="cartStore.totalItems > 0" class="navbar__badge">{{ cartStore.totalItems }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #1e293b;
  color: #fff;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 60px;
}
.navbar__brand {
  font-size: 1.4rem;
  font-weight: 700;
  color: #60a5fa;
  text-decoration: none;
}
.navbar__links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.navbar__link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.navbar__link:hover, .navbar__link.router-link-active {
  background: #334155;
  color: #fff;
}
.navbar__cart {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.navbar__badge {
  background: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}
</style>
