import { randomUUID } from 'crypto';
import store from '../db/jsonStore.js';

export async function getAll() {
  await store.load();
  return store.db.products;
}

export async function getById(id) {
  await store.load();
  return store.db.products.find(p => p.id === id) || null;
}

export async function create(data) {
  await store.load();
  const product = {
    id: randomUUID(),
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.db.products.push(product);
  await store.save();
  return product;
}

export async function update(id, data) {
  await store.load();
  const index = store.db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updated = {
    ...store.db.products[index],
    ...data,
    id,
    price: data.price !== undefined ? Number(data.price) : store.db.products[index].price,
    stock: data.stock !== undefined ? Number(data.stock) : store.db.products[index].stock,
    updatedAt: new Date().toISOString()
  };
  store.db.products[index] = updated;
  await store.save();
  return updated;
}

export async function remove(id) {
  await store.load();
  const index = store.db.products.findIndex(p => p.id === id);
  if (index === -1) return false;
  store.db.products.splice(index, 1);
  await store.save();
  return true;
}
