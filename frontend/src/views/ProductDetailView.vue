<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart.store.js'
import BaseLoader from '../components/BaseLoader.vue'
import BaseError from '../components/BaseError.vue'
import { api } from '../services/api.service.js'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)
const notFound = ref(false)

onMounted(async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      api.get(`/products/${route.params.id}`),
      api.get('/categories')
    ])
    product.value = prodRes.data
    const cat = catRes.data.find(c => c.id === product.value.categoryId)
    product.value.categoryName = cat ? cat.name : 'General'
  } catch (err) {
    if (err.status === 404) notFound.value = true
    else error.value = err.message || 'Error al cargar el producto'
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (!product.value) return
  cartStore.addItem(product.value)
}
</script>

<template>
  <div class="detail">
    <BaseLoader v-if="loading" message="Cargando producto..." />

    <div v-else-if="notFound" class="detail__not-found">
      <h2>Producto no encontrado</h2>
      <p>El producto que buscas no existe o ha sido eliminado.</p>
      <router-link to="/" class="btn btn--primary">Volver al catálogo</router-link>
    </div>

    <BaseError v-else-if="error" :message="error" />

    <div v-else-if="product" class="detail__content">
      <div class="detail__image-wrap">
        <img :src="product.imageUrl" :alt="product.name" class="detail__image" />
      </div>
      <div class="detail__info">
        <span class="detail__category">{{ product.categoryName }}</span>
        <h1 class="detail__name">{{ product.name }}</h1>
        <p class="detail__price">${{ Number(product.price).toFixed(2) }}</p>
        <div class="detail__stock" :class="{ 'detail__stock--low': product.stock < 5 }">
          {{ product.stock > 0 ? `${product.stock} unidades en stock` : 'Agotado' }}
        </div>
        <p class="detail__desc">{{ product.description }}</p>
        <div class="detail__actions">
          <button class="btn btn--primary" :disabled="product.stock === 0" @click="addToCart">
            {{ product.stock > 0 ? 'Añadir al carrito' : 'Agotado' }}
          </button>
          <router-link :to="`/product/${product.id}/edit`" class="btn btn--outline">Editar</router-link>
          <router-link to="/" class="btn btn--ghost">Volver al catálogo</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.detail__not-found {
  text-align: center;
  padding: 3rem 1rem;
}
.detail__not-found h2 {
  color: #1e293b;
  margin: 0 0 0.5rem;
}
.detail__not-found p {
  color: #64748b;
  margin: 0 0 1.5rem;
}
.detail__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 700px) {
  .detail__content {
    grid-template-columns: 1fr;
  }
}
.detail__image-wrap {
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;
}
.detail__image {
  width: 100%;
  display: block;
  aspect-ratio: 1;
  object-fit: cover;
}
.detail__info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.detail__category {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  font-weight: 600;
}
.detail__name {
  font-size: 1.6rem;
  margin: 0;
  color: #1e293b;
}
.detail__price {
  font-size: 2rem;
  font-weight: 700;
  color: #059669;
  margin: 0;
}
.detail__stock {
  font-size: 0.9rem;
  color: #64748b;
}
.detail__stock--low {
  color: #dc2626;
  font-weight: 600;
}
.detail__desc {
  color: #475569;
  line-height: 1.6;
  margin: 0.5rem 0;
}
.detail__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
</style>
