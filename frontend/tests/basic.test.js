import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../src/stores/cart.store.js'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('debe iniciar vacío', () => {
    const store = useCartStore()
    expect(store.items).toHaveLength(0)
    expect(store.totalItems).toBe(0)
    expect(store.totalPrice).toBe(0)
  })

  it('debe agregar un producto', () => {
    const store = useCartStore()
    const product = { id: '1', name: 'Test', price: 100, imageUrl: 'test.jpg' }
    store.addItem(product)
    expect(store.items).toHaveLength(1)
    expect(store.totalItems).toBe(1)
  })

  it('debe calcular total correctamente', () => {
    const store = useCartStore()
    store.addItem({ id: '1', name: 'A', price: 10, imageUrl: 'a.jpg' })
    store.addItem({ id: '2', name: 'B', price: 20, imageUrl: 'b.jpg' })
    expect(store.totalPrice).toBe(30)
    expect(store.totalItems).toBe(2)
  })

  it('debe aumentar cantidad al agregar producto existente', () => {
    const store = useCartStore()
    const product = { id: '1', name: 'A', price: 10, imageUrl: 'a.jpg' }
    store.addItem(product)
    store.addItem(product)
    expect(store.items).toHaveLength(1)
    expect(store.totalItems).toBe(2)
    expect(store.totalPrice).toBe(20)
  })

  it('debe eliminar un producto', () => {
    const store = useCartStore()
    store.addItem({ id: '1', name: 'A', price: 10, imageUrl: 'a.jpg' })
    store.removeItem('1')
    expect(store.items).toHaveLength(0)
  })

  it('debe vaciar el carrito', () => {
    const store = useCartStore()
    store.addItem({ id: '1', name: 'A', price: 10, imageUrl: 'a.jpg' })
    store.addItem({ id: '2', name: 'B', price: 20, imageUrl: 'b.jpg' })
    store.clearCart()
    expect(store.items).toHaveLength(0)
    expect(store.totalItems).toBe(0)
    expect(store.totalPrice).toBe(0)
  })
})
