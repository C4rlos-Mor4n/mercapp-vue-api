import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../db/database.json');

const categories = [
  { id: 'cat-tecnologia', name: 'Tecnología' },
  { id: 'cat-hogar', name: 'Hogar' },
  { id: 'cat-ropa', name: 'Ropa' },
  { id: 'cat-accesorios', name: 'Accesorios' }
];

const products = [
  { id: 'prod-001', name: 'Smartphone Galaxy S24', description: 'Smartphone de última generación con pantalla AMOLED de 6.8 pulgadas, procesador Exynos 2400, 256GB de almacenamiento y cámara de 200MP. Incluye batería de 5000mAh con carga rápida de 45W.', price: 899.99, imageUrl: 'https://picsum.photos/seed/s24/400/400', categoryId: 'cat-tecnologia', stock: 15 },
  { id: 'prod-002', name: 'Laptop ProBook 15', description: 'Laptop profesional con procesador Intel Core i7, 16GB RAM, SSD de 512GB y pantalla Full HD de 15.6 pulgadas. Ideal para trabajo y estudio con autonomía de hasta 12 horas.', price: 1299.99, imageUrl: 'https://picsum.photos/seed/laptop/400/400', categoryId: 'cat-tecnologia', stock: 10 },
  { id: 'prod-003', name: 'Audífonos Bluetooth Pro', description: 'Audífonos inalámbricos con cancelación de ruido activa, drivers de 40mm, batería de 30 horas y plegables. Cómodos para uso prolongado con almohadillas de memory foam.', price: 79.99, imageUrl: 'https://picsum.photos/seed/audifonos/400/400', categoryId: 'cat-tecnologia', stock: 30 },
  { id: 'prod-004', name: 'Lámpara de Mesa LED', description: 'Lámpara de escritorio LED con brazo articulado, luz ajustable en temperatura de color (3000K-6500K) y brillo. Incluye puerto USB para carga de dispositivos y base antideslizante.', price: 45.99, imageUrl: 'https://picsum.photos/seed/lampara/400/400', categoryId: 'cat-hogar', stock: 25 },
  { id: 'prod-005', name: 'Set de Sartenes Antiadherentes', description: 'Juego de 3 sartenes de aluminio forjado con recubrimiento antiadherente triple capa. Aptos para todo tipo de cocinas, incluyendo inducción. Mangos ergonómicos removibles.', price: 89.99, imageUrl: 'https://picsum.photos/seed/sartenes/400/400', categoryId: 'cat-hogar', stock: 20 },
  { id: 'prod-006', name: 'Organizador de Escritorio', description: 'Organizador multifuncional de bambú natural con 8 compartimentos. Incluye soporte para teléfono, portalápices y bandeja para documentos. Dimensiones: 30x20x15cm.', price: 34.99, imageUrl: 'https://picsum.photos/seed/organizador/400/400', categoryId: 'cat-hogar', stock: 40 },
  { id: 'prod-007', name: 'Camiseta Algodón Premium', description: 'Camiseta de algodón orgánico peinado de 180g/m². Corte regular, costuras reforzadas y cuello ribeteado. Disponible en varios colores. Lavable a máquina sin perder forma.', price: 29.99, imageUrl: 'https://picsum.photos/seed/camiseta/400/400', categoryId: 'cat-ropa', stock: 50 },
  { id: 'prod-008', name: 'Chaqueta Impermeable', description: 'Chaqueta técnica con membrana impermeable y transpirable. Capucha ajustable, costuras selladas y bolsillos con cremallera. Peso ligero de solo 450g ideal para actividades al aire libre.', price: 119.99, imageUrl: 'https://picsum.photos/seed/chaqueta/400/400', categoryId: 'cat-ropa', stock: 15 },
  { id: 'prod-009', name: 'Mochila Urbana 30L', description: 'Mochila moderna con compartimento acolchado para laptop de hasta 15.6 pulgadas. Bolsillo organizador frontal, laterales para botella y respaldo ergonómico. Material impermeable resistente.', price: 59.99, imageUrl: 'https://picsum.photos/seed/mochila/400/400', categoryId: 'cat-accesorios', stock: 22 },
  { id: 'prod-010', name: 'Reloj Deportivo Smart', description: 'Reloj inteligente con GPS integrado, monitor de frecuencia cardíaca y resistencia al agua 5ATM. Pantalla AMOLED táctil, batería de 14 días y compatible con iOS y Android.', price: 199.99, imageUrl: 'https://picsum.photos/seed/reloj/400/400', categoryId: 'cat-accesorios', stock: 18 }
];

async function seed() {
  const data = { categories, products };
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Seed completado: ${categories.length} categorías y ${products.length} productos insertados.`);
}

seed().catch(console.error);
