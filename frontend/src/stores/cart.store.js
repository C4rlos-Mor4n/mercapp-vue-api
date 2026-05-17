import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('mercapp-cart') || '[]'))

  function save() {
    localStorage.setItem('mercapp-cart', JSON.stringify(items.value))
  }

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    save()
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
    save()
  }

  function increaseQuantity(productId) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      item.quantity++
      save()
    }
  }

  function decreaseQuantity(productId) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeItem(productId)
      }
      save()
    }
  }

  function clearCart() {
    items.value = []
    save()
  }

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  return { items, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, totalItems, totalPrice }
})
