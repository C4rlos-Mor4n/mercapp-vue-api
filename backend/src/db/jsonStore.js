import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

const db = {
  products: [],
  categories: []
};

async function load() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    db.products = parsed.products || [];
    db.categories = parsed.categories || [];
  } catch {
    db.products = [];
    db.categories = [];
  }
}

async function save() {
  await fs.writeFile(DB_PATH, JSON.stringify({ products: db.products, categories: db.categories }, null, 2), 'utf-8');
}

export default { db, load, save };
