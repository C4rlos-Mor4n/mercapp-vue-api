<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'
import BaseLoader from '../components/BaseLoader.vue'
import BaseError from '../components/BaseError.vue'
import { api } from '../services/api.service.js'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const categories = ref([])
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
    categories.value = catRes.data
  } catch (err) {
    if (err.status === 404) notFound.value = true
    else error.value = err.message || 'Error al cargar datos'
  } finally {
    loading.value = false
  }
})

async function handleSubmit(data) {
  try {
    await api.put(`/products/${route.params.id}`, data)
    router.push(`/product/${route.params.id}`)
  } catch (err) {
    alert(err.message || 'Error al actualizar producto')
  }
}
</script>

<template>
  <div class="edit-page">
    <BaseLoader v-if="loading" message="Cargando producto..." />
    <div v-else-if="notFound" class="edit-page__not-found">
      <h2>Producto no encontrado</h2>
      <p>No se puede editar un producto que no existe.</p>
      <router-link to="/" class="btn btn--primary">Volver al catálogo</router-link>
    </div>
    <BaseError v-else-if="error" :message="error" />
    <template v-else>
      <h1 class="page-title">Editar: {{ product.name }}</h1>
      <ProductForm :initial-data="product" :categories="categories" is-editing @submit="handleSubmit" />
    </template>
  </div>
</template>

<style scoped>
.edit-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.edit-page__not-found {
  text-align: center;
  padding: 3rem 1rem;
}
.edit-page__not-found h2 {
  color: #1e293b;
  margin: 0 0 0.5rem;
}
.edit-page__not-found p {
  color: #64748b;
  margin: 0 0 1.5rem;
}
</style>
