<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  initialData: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
  isEditing: { type: Boolean, default: false }
})

const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  categoryId: '',
  stock: ''
})

const errors = ref({})

watch(() => props.initialData, (val) => {
  if (val) {
    form.value = {
      name: val.name || '',
      description: val.description || '',
      price: val.price?.toString() || '',
      imageUrl: val.imageUrl || '',
      categoryId: val.categoryId || '',
      stock: val.stock?.toString() || ''
    }
  }
}, { immediate: true })

function validate() {
  const errs = {}
  if (!form.value.name || form.value.name.trim().length < 2) errs.name = 'El nombre debe tener al menos 2 caracteres'
  if (!form.value.description || form.value.description.trim().length === 0) errs.description = 'La descripción es obligatoria'
  const price = Number(form.value.price)
  if (!form.value.price || isNaN(price) || price <= 0) errs.price = 'El precio debe ser un número mayor a 0'
  if (!form.value.imageUrl) errs.imageUrl = 'La URL de la imagen es obligatoria'
  else {
    try { new URL(form.value.imageUrl) } catch { errs.imageUrl = 'La URL no es válida' }
  }
  if (!form.value.categoryId) errs.categoryId = 'La categoría es obligatoria'
  const stock = Number(form.value.stock)
  if (form.value.stock === '' || isNaN(stock) || !Number.isInteger(stock) || stock < 0) errs.stock = 'El stock debe ser un número entero mayor o igual a 0'
  errors.value = errs
  return Object.keys(errs).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    price: Number(form.value.price),
    imageUrl: form.value.imageUrl.trim(),
    categoryId: form.value.categoryId,
    stock: Number(form.value.stock)
  })
}

const selectedCategoryName = computed(() => {
  const cat = props.categories.find(c => c.id === form.value.categoryId)
  return cat ? cat.name : ''
})
</script>

<template>
  <form class="product-form" @submit.prevent="handleSubmit" novalidate>
    <div class="form-group" :class="{ 'form-group--error': errors.name }">
      <label class="form-label" for="name">Nombre del producto *</label>
      <input id="name" v-model="form.name" type="text" class="form-input" placeholder="Ej: Smartphone Galaxy S24" />
      <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
    </div>

    <div class="form-group" :class="{ 'form-group--error': errors.description }">
      <label class="form-label" for="description">Descripción *</label>
      <textarea id="description" v-model="form.description" class="form-input form-textarea" rows="4" placeholder="Describe el producto en detalle..."></textarea>
      <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
    </div>

    <div class="form-row">
      <div class="form-group" :class="{ 'form-group--error': errors.price }">
        <label class="form-label" for="price">Precio *</label>
        <input id="price" v-model="form.price" type="number" step="0.01" min="0.01" class="form-input" placeholder="0.00" />
        <p v-if="errors.price" class="form-error">{{ errors.price }}</p>
      </div>

      <div class="form-group" :class="{ 'form-group--error': errors.stock }">
        <label class="form-label" for="stock">Stock *</label>
        <input id="stock" v-model="form.stock" type="number" step="1" min="0" class="form-input" placeholder="0" />
        <p v-if="errors.stock" class="form-error">{{ errors.stock }}</p>
      </div>
    </div>

    <div class="form-group" :class="{ 'form-group--error': errors.imageUrl }">
      <label class="form-label" for="imageUrl">URL de la imagen *</label>
      <input id="imageUrl" v-model="form.imageUrl" type="url" class="form-input" placeholder="https://ejemplo.com/imagen.jpg" />
      <p v-if="errors.imageUrl" class="form-error">{{ errors.imageUrl }}</p>
      <div v-if="form.imageUrl && !errors.imageUrl" class="form-preview">
        <img :src="form.imageUrl" alt="Preview" class="form-preview__img" />
      </div>
    </div>

    <div class="form-group" :class="{ 'form-group--error': errors.categoryId }">
      <label class="form-label" for="categoryId">Categoría *</label>
      <select id="categoryId" v-model="form.categoryId" class="form-input">
        <option value="" disabled>Selecciona una categoría</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <p v-if="errors.categoryId" class="form-error">{{ errors.categoryId }}</p>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn--primary">
        {{ isEditing ? 'Actualizar producto' : 'Crear producto' }}
      </button>
      <router-link to="/" class="btn btn--outline">Cancelar</router-link>
    </div>
  </form>
</template>

<style scoped>
.product-form {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #334155;
}
.form-input {
  padding: 0.65rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: #fff;
  font-family: inherit;
}
.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.form-group--error .form-input {
  border-color: #dc2626;
}
.form-error {
  color: #dc2626;
  font-size: 0.8rem;
  margin: 0;
}
.form-preview {
  margin-top: 0.3rem;
}
.form-preview__img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}
.form-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
