<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart.store.js'
import ProductCard from '../components/ProductCard.vue'
import BaseLoader from '../components/BaseLoader.vue'
import BaseError from '../components/BaseError.vue'
import { useProducts } from '../composables/useProducts.js'

const cartStore = useCartStore()
const { getProducts, getCategories, deleteProduct } = useProducts()

const products = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)
const search = ref('')
const selectedCategory = ref('')

onMounted(async () => {
  try {
    const [prods, cats] = await Promise.all([getProducts(), getCategories()])
    categories.value = cats
    const catMap = Object.fromEntries(cats.map(c => [c.id, c.name]))
    products.value = prods.map(p => ({ ...p, categoryName: catMap[p.categoryId] || 'General' }))
  } catch (err) {
    error.value = err.message || 'Error al cargar productos'
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
  let result = products.value
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  }
  if (selectedCategory.value) {
    result = result.filter(p => p.categoryId === selectedCategory.value)
  }
  return result
})

function addToCart(product) {
  cartStore.addItem(product)
}

async function handleDelete(id) {
  if (!confirm('¿Eliminar este producto?')) return
  try {
    await deleteProduct(id)
    products.value = products.value.filter(p => p.id !== id)
  } catch (err) {
    alert('Error al eliminar: ' + err.message)
  }
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero__title">MercApp</h1>
      <p class="hero__subtitle">Tu catálogo de productos favoritos</p>
    </section>

    <div class="home__toolbar">
      <input v-model="search" type="text" class="search-input" placeholder="Buscar productos..." />
      <select v-model="selectedCategory" class="filter-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <router-link to="/product/new" class="btn btn--primary">+ Nuevo producto</router-link>
    </div>

    <BaseLoader v-if="loading" message="Cargando productos..." />

    <BaseError v-else-if="error" :message="error" />

    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <p class="empty-state__text" v-if="search || selectedCategory">No se encontraron productos con los filtros actuales.</p>
      <p class="empty-state__text" v-else>No hay productos disponibles. ¡Crea el primero!</p>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-wrapper">
        <ProductCard
          :product="product"
          @added-to-cart="addToCart"
        />
        <div class="product-actions">
          <router-link :to="`/product/${product.id}/edit`" class="btn btn--outline btn--sm">Editar</router-link>
          <button class="btn btn--danger btn--sm" @click="handleDelete(product.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
.hero {
  text-align: center;
  padding: 2rem 1rem;
}
.hero__title {
  font-size: 2rem;
  color: #1e293b;
  margin: 0;
}
.hero__subtitle {
  color: #64748b;
  margin: 0.5rem 0 0;
}
.home__toolbar {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  align-items: center;
}
.search-input, .filter-select {
  padding: 0.6rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  flex: 1;
  min-width: 200px;
  background: #fff;
  font-family: inherit;
}
.search-input:focus, .filter-select:focus {
  outline: none;
  border-color: #2563eb;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.product-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.product-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.btn--sm {
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
}
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #64748b;
}
.empty-state__text {
  font-size: 1.1rem;
}
@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  .home__toolbar {
    flex-direction: column;
  }
  .search-input, .filter-select {
    width: 100%;
    min-width: unset;
  }
}
</style>
