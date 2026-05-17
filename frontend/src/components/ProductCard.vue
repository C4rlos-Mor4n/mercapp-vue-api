<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['added-to-cart'])

const shortDesc = computed(() => {
  return props.product.description.length > 100
    ? props.product.description.slice(0, 100) + '...'
    : props.product.description
})
</script>

<template>
  <article class="product-card">
    <router-link :to="`/product/${product.id}`" class="product-card__image-wrap">
      <img :src="product.imageUrl" :alt="product.name" class="product-card__image" loading="lazy" />
    </router-link>
    <div class="product-card__body">
      <span class="product-card__category">{{ product.categoryName || 'General' }}</span>
      <router-link :to="`/product/${product.id}`" class="product-card__title">{{ product.name }}</router-link>
      <p class="product-card__desc">{{ shortDesc }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${{ Number(product.price).toFixed(2) }}</span>
        <span class="product-card__stock" :class="{ 'product-card__stock--low': product.stock < 5 }">
          {{ product.stock > 0 ? `${product.stock} en stock` : 'Agotado' }}
        </span>
      </div>
      <button
        class="btn btn--primary product-card__btn"
        :disabled="product.stock === 0"
        @click="emit('added-to-cart', product)"
      >
        {{ product.stock > 0 ? 'Añadir al carrito' : 'Agotado' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.product-card__image-wrap {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f1f5f9;
}
.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.product-card:hover .product-card__image {
  transform: scale(1.05);
}
.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}
.product-card__category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  font-weight: 600;
}
.product-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  line-height: 1.3;
}
.product-card__title:hover {
  color: #2563eb;
}
.product-card__desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
  flex: 1;
}
.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.product-card__price {
  font-size: 1.15rem;
  font-weight: 700;
  color: #059669;
}
.product-card__stock {
  font-size: 0.8rem;
  color: #64748b;
}
.product-card__stock--low {
  color: #dc2626;
  font-weight: 600;
}
.product-card__btn {
  margin-top: 0.5rem;
  width: 100%;
}
</style>
