# MercApp - Catálogo de productos SPA + API propia

**Carlos Andrés Morán Vásquez**  
Universidad Politécnica Salesiana  
Aplicaciones Web  
Tarea #1 - Unidad 3. Programación del lado del cliente

---

## Descripción del proyecto

MercApp es una aplicación web de catálogo de productos tipo SPA (Single Page Application) desarrollada con **Vue 3** que consume un **API REST propio** creado con **Node.js y Express**. El proyecto integra los contenidos de la Unidad 2 (backend API REST) y Unidad 3 (programación del lado del cliente con Vue) en un solo repositorio tipo monorepo.

La aplicación permite visualizar productos, buscarlos y filtrarlos por categoría, ver su detalle completo, crear nuevos productos, editarlos, eliminarlos y gestionar un carrito de compras persistente.

---

## Tecnologías utilizadas

### Frontend
- **Vue 3** con Composition API y Single File Components (.vue)
- **Vite** como bundler de desarrollo
- **Vue Router** para navegación SPA con lazy loading
- **Pinia** para gestión de estado global (carrito de compras)
- **CSS propio** responsivo con enfoque mobile-first

### Backend
- **Node.js** con módulos ES (ESM)
- **Express** para el framework HTTP
- **CORS** para comunicación entre frontend y backend
- **Persistencia en archivo JSON** (database.json)
- **Validación manual** de datos en el servidor
- **Manejo de errores** 400, 404 y 500

---

## Funcionalidades implementadas

- Catálogo de productos con búsqueda por nombre y descripción
- Filtro de productos por categoría usando `computed` properties
- CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)
- Vista de detalle de producto con toda la información
- Formulario reutilizable para crear y editar productos con validación
- Carrito de compras con persistencia en localStorage
- Aumentar/disminuir cantidad y eliminar productos del carrito
- Cálculo automático de total de items y precio
- Manejo de estados: loading, error, vacío y éxito
- Lazy loading en rutas de carrito y acerca de
- Suspense con fallback visual
- Diseño responsive mobile-first
- Manejo de ruta 404 para páginas no encontradas

---

## Estructura de carpetas

```
mercapp-vue-api/
├── README.md
├── readme.txt
├── .gitignore
├── .env.example
├── package.json
├── backend/
│   ├── package.json
│   ├── .env / .env.example
│   ├── src/
│   │   ├── server.js
│   │   ├── app.js
│   │   ├── routes/
│   │   │   ├── product.routes.js
│   │   │   └── category.routes.js
│   │   ├── controllers/
│   │   │   ├── product.controller.js
│   │   │   └── category.controller.js
│   │   ├── services/
│   │   │   ├── product.service.js
│   │   │   └── category.service.js
│   │   ├── models/
│   │   │   ├── product.model.js
│   │   │   └── category.model.js
│   │   ├── validators/
│   │   │   └── product.validator.js
│   │   ├── middlewares/
│   │   │   ├── error.middleware.js
│   │   │   └── notFound.middleware.js
│   │   ├── db/
│   │   │   ├── database.json
│   │   │   └── jsonStore.js
│   │   └── seed/
│   │       └── seed.js
│   └── tests/
│       └── api.test.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── .env / .env.example
    ├── src/
    │   ├── main.js
    │   ├── App.vue
    │   ├── assets/
    │   │   └── main.css
    │   ├── router/
    │   │   └── index.js
    │   ├── stores/
    │   │   └── cart.store.js
    │   ├── services/
    │   │   └── api.service.js
    │   ├── composables/
    │   │   ├── useApi.js
    │   │   └── useProducts.js
    │   ├── components/
    │   │   ├── ProductCard.vue
    │   │   ├── ProductForm.vue
    │   │   ├── BaseLoader.vue
    │   │   ├── BaseError.vue
    │   │   └── Navbar.vue
    │   └── views/
    │       ├── HomeView.vue
    │       ├── ProductDetailView.vue
    │       ├── ProductCreateView.vue
    │       ├── ProductEditView.vue
    │       ├── CartView.vue
    │       ├── AboutView.vue
    │       └── NotFoundView.vue
    └── tests/
        └── basic.test.js
```

---

## Endpoints del API

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| PATCH | `/api/products/:id` | Actualización parcial de un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

### Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories` | Obtener todas las categorías |

### Modelo de Producto

```json
{
  "id": "uuid",
  "name": "string (mín. 2 caracteres)",
  "description": "string",
  "price": "number (> 0)",
  "imageUrl": "string (URL válida)",
  "categoryId": "string (debe existir)",
  "stock": "integer (>= 0)"
}
```

### Respuestas

```json
// Éxito
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Mensaje del error", "errors": [] }
```

---

## Instrucciones de instalación

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### 1. Clonar el repositorio

```bash
git clone https://github.com/C4rlos-Mor4n/mercapp-vue-api.git
cd mercapp-vue-api
```

### 2. Instalar dependencias

```bash
npm run install:all
```

Este comando instala las dependencias de la raíz, del backend y del frontend automáticamente.

### 3. Configurar variables de entorno

El proyecto incluye archivos `.env` con valores por defecto. Si deseas personalizarlos, copia los `.env.example`:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

---

## Cómo ejecutar

### Ejecutar backend y frontend simultáneamente

```bash
npm run dev
```

### Solo backend (http://localhost:3000)

```bash
npm run dev:backend
```

### Solo frontend (http://localhost:5173)

```bash
npm run dev:frontend
```

El frontend se comunica con el backend en `http://localhost:3000/api` a través de la variable `VITE_API_URL`.

---

## Poblar datos con seed

Para llenar la base de datos con datos de ejemplo (4 categorías y 10 productos):

```bash
npm run seed
```

---

## Variables de entorno

### Raíz

```
BACKEND_PORT=3000
VITE_API_URL=http://localhost:3000/api
```

### Backend (`backend/.env`)

```
PORT=3000
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3000/api
```

---

## Cómo probar la aplicación

### Probar backend

Ejecuta las pruebas del API REST:

```bash
cd backend && npm test
```

Esto ejecuta 4 pruebas:
- GET /api/products responde 200
- GET /api/categories responde 200
- POST /api/products rechaza datos inválidos con 400
- GET /api/products/:id inexistente responde 404

### Probar frontend

Ejecuta las pruebas del carrito con Vitest:

```bash
cd frontend && npm test
```

Esto ejecuta 6 pruebas:
- Inicio vacío
- Agregar producto
- Calcular total
- Aumentar cantidad
- Eliminar producto
- Vaciar carrito

### Probar todo

```bash
npm test
```

### Build de producción

```bash
npm run build
```

---

## Evidencia de cumplimiento de requisitos

| Requisito | Estado |
|-----------|--------|
| API REST propia con endpoints solicitados | ✅ |
| Modelos Product y Category completos | ✅ |
| Validación completa en backend | ✅ |
| Manejo de errores 400, 404, 500 | ✅ |
| Semilla con 10 productos y 4 categorías | ✅ |
| Vue 3 + Vite + Composition API | ✅ |
| Componentes SFC (.vue) | ✅ |
| Vue Router con todas las rutas solicitadas | ✅ |
| Ruta 404 comodín | ✅ |
| Home con búsqueda y filtro por categoría | ✅ |
| ProductCard con prop product y evento added-to-cart | ✅ |
| Vista de detalle por id | ✅ |
| Composables useApi y useProducts | ✅ |
| useApi con reintento y AbortController | ✅ |
| Formulario crear/editar con v-model y validación | ✅ |
| Lazy loading en /cart y /about | ✅ |
| Suspense con fallback | ✅ |
| Carrito con Pinia y localStorage | ✅ |
| Diseño responsivo mobile-first | ✅ |
| CSS propio visualmente cuidado | ✅ |
| README completo en primera persona | ✅ |
| readme.txt con URL del repositorio | ✅ |
| .env.example en raíz, backend y frontend | ✅ |
| Pruebas básicas de API y carrito | ✅ |
| Proyecto listo para ZIP | ✅ |

---

## Notas de entrega

- El proyecto se entrega comprimido como `Actividad3-Moran-Carlos.zip`
- Se incluye el directorio `.git` con el historial de commits completo
- El backend usa persistencia en archivo JSON, no requiere base de datos externa
- Las imágenes de productos usan URLs públicas de picsum.photos
- Para usar la aplicación abre http://localhost:5173 en el navegador

---

## Repositorio GitHub

[https://github.com/C4rlos-Mor4n/mercapp-vue-api](https://github.com/C4rlos-Mor4n/mercapp-vue-api)
