import { createServer } from 'http';
import app from '../src/app.js';

let server;
const PORT = 3099;
const BASE = `http://localhost:${PORT}/api`;

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  return { status: res.status, data: await res.json() };
}

let passed = 0;
let failed = 0;

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

async function main() {
  server = app.listen(PORT);
  console.log('\n🧪 Pruebas del API');
  console.log('=================\n');

  await runTest('GET /api/products responde 200', async () => {
    const res = await request('GET', '/products');
    if (res.status !== 200) throw new Error(`Status ${res.status}, esperado 200`);
    if (!res.data.success) throw new Error('success debe ser true');
    if (!Array.isArray(res.data.data)) throw new Error('data debe ser un array');
  });

  await runTest('GET /api/categories responde 200', async () => {
    const res = await request('GET', '/categories');
    if (res.status !== 200) throw new Error(`Status ${res.status}, esperado 200`);
    if (!res.data.success) throw new Error('success debe ser true');
  });

  await runTest('POST /api/products rechaza datos inválidos con 400', async () => {
    const res = await request('POST', '/products', { name: '' });
    if (res.status !== 400) throw new Error(`Status ${res.status}, esperado 400`);
    if (res.data.success !== false) throw new Error('success debe ser false');
  });

  await runTest('GET /api/products/:id inexistente responde 404', async () => {
    const res = await request('GET', '/products/id-inexistente');
    if (res.status !== 404) throw new Error(`Status ${res.status}, esperado 404`);
    if (res.data.success !== false) throw new Error('success debe ser false');
  });

  console.log(`\n📊 Resultados: ${passed} pasaron, ${failed} fallaron\n`);
  server.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
