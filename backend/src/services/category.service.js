import store from '../db/jsonStore.js';

export async function getAll() {
  await store.load();
  return store.db.categories;
}
