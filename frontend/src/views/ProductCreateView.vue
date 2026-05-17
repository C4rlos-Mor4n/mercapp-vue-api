<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'
import BaseLoader from '../components/BaseLoader.vue'
import BaseError from '../components/BaseError.vue'
import { api } from '../services/api.service.js'

const router = useRouter()
const categories = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data
  } catch (err) {
    error.value = err.message || 'Error al cargar categorías'
  } finally {
    loading.value = false
  }
})

async function handleSubmit(data) {
  try {
    const res = await api.post('/products', data)
    router.push(`/product/${res.data.id}`)
  } catch (err) {
    alert(err.message || 'Error al crear producto')
  }
}
</script>

<template>
  <div class="create-page">
    <h1 class="page-title">Nuevo producto</h1>
    <BaseLoader v-if="loading" message="Cargando formulario..." />
    <BaseError v-else-if="error" :message="error" />
    <ProductForm v-else :categories="categories" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.create-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
