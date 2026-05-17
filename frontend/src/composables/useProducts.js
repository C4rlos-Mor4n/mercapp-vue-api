import { ref } from 'vue'
import { api } from '../services/api.service.js'

export function useProducts() {
  const loading = ref(false)
  const error = ref(null)

  async function getProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/products')
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getProductById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createProduct(payload) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/products', payload)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id, payload) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/products/${id}`, payload)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id) {
    loading.value = true
    error.value = null
    try {
      const response = await api.delete(`/products/${id}`)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getCategories() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/categories')
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories
  }
}
