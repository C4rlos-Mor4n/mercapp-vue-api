import store from '../db/jsonStore.js';

export async function validateProduct(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }
  }

  if (!isUpdate || data.description !== undefined) {
    if (!data.description || typeof data.description !== 'string') {
      errors.push('La descripción es obligatoria');
    }
  }

  if (!isUpdate || data.price !== undefined) {
    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      errors.push('El precio debe ser un número mayor a 0');
    }
  }

  if (!isUpdate || data.imageUrl !== undefined) {
    if (!data.imageUrl || typeof data.imageUrl !== 'string') {
      errors.push('La URL de la imagen es obligatoria');
    } else {
      try {
        new URL(data.imageUrl);
      } catch {
        errors.push('La URL de la imagen no es válida');
      }
    }
  }

  if (!isUpdate || data.categoryId !== undefined) {
    if (!data.categoryId) {
      errors.push('La categoría es obligatoria');
    } else {
      await store.load();
      const categoryExists = store.db.categories.some(c => c.id === data.categoryId);
      if (!categoryExists) {
        errors.push('La categoría especificada no existe');
      }
    }
  }

  if (!isUpdate || data.stock !== undefined) {
    const stock = Number(data.stock);
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
      errors.push('El stock debe ser un número entero mayor o igual a 0');
    }
  }

  return errors;
}
