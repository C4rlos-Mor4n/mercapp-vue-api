<script setup>
import { useCartStore } from '../stores/cart.store.js'
const cartStore = useCartStore()
</script>

<template>
  <div class="cart">
    <h1 class="cart__title">Carrito de compras</h1>

    <div v-if="cartStore.items.length === 0" class="cart__empty">
      <p>Tu carrito está vacío.</p>
      <router-link to="/" class="btn btn--primary">Ir al catálogo</router-link>
    </div>

    <div v-else class="cart__content">
      <div class="cart__items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="cart-item__image" />
          <div class="cart-item__info">
            <h3 class="cart-item__name">{{ item.name }}</h3>
            <p class="cart-item__price">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <div class="cart-item__qty">
            <button class="qty-btn" @click="cartStore.decreaseQuantity(item.id)">−</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button class="qty-btn" @click="cartStore.increaseQuantity(item.id)">+</button>
          </div>
          <button class="cart-item__remove" @click="cartStore.removeItem(item.id)" title="Eliminar">✕</button>
        </div>
      </div>

      <div class="cart__summary">
        <h2 class="cart__summary-title">Resumen</h2>
        <div class="cart__summary-row">
          <span>Productos:</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>
        <div class="cart__summary-row cart__summary-total">
          <span>Total:</span>
          <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="btn btn--danger" @click="cartStore.clearCart()">Vaciar carrito</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.cart__title {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0 0 1.5rem;
}
.cart__empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #64748b;
}
.cart__empty p { margin-bottom: 1rem; }
.cart__content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 700px) {
  .cart__content { grid-template-columns: 1fr; }
}
.cart__items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.cart-item__image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.cart-item__info {
  flex: 1;
  min-width: 0;
}
.cart-item__name {
  font-size: 0.95rem;
  margin: 0 0 0.25rem;
  color: #1e293b;
}
.cart-item__price {
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
  margin: 0;
}
.cart-item__qty {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.qty-btn {
  width: 32px;
  height: 32px;
  border: 2px solid #e2e8f0;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}
.qty-btn:hover { border-color: #2563eb; }
.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}
.cart-item__remove {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: color 0.2s;
}
.cart-item__remove:hover { color: #dc2626; }
.cart__summary {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: sticky;
  top: 80px;
}
.cart__summary-title {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  color: #1e293b;
}
.cart__summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #475569;
}
.cart__summary-total {
  font-weight: 700;
  font-size: 1.15rem;
  color: #1e293b;
  border-top: 2px solid #e2e8f0;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}
</style>
