<template>
  <div class="about">
    <h1 class="about__title">Acerca de MercApp</h1>
    <div class="about__content">
      <p>
        Soy Carlos Andrés Morán Vásquez, estudiante de la Universidad Politécnica Salesiana, y desarrollé
        <strong>MercApp</strong> como una aplicación web SPA (Single Page Application) con Vue 3 que consume
        un API REST propio.
      </p>
      <p>
        El proyecto integra todo lo aprendido en la Unidad 3 sobre programación del lado del cliente, y
        también incluye un backend completo desarrollado en Node.js con Express, cumpliendo así con los
        contenidos de la Unidad 2.
      </p>
      <h2>Tecnologías implementadas</h2>
      <ul>
        <li><strong>Frontend:</strong> Vue 3 con Composition API, Vite, Vue Router y Pinia.</li>
        <li><strong>Backend:</strong> Node.js con Express, persistencia en archivo JSON y validación.</li>
        <li><strong>Diseño:</strong> CSS propio, responsivo y mobile-first.</li>
      </ul>
      <h2>Funcionalidades</h2>
      <ul>
        <li>Catálogo de productos con búsqueda y filtro por categoría.</li>
        <li>CRUD completo: crear, ver, editar y eliminar productos.</li>
        <li>Carrito de compras persistente con localStorage.</li>
        <li>Validación de formularios en cliente y servidor.</li>
        <li>Manejo de estados: carga, error, vacío y éxito.</li>
        <li>Rutas protegidas con manejo de 404 y lazy loading.</li>
        <li>Carga asíncrona con Suspense y componentes reutilizables.</li>
      </ul>
      <p>
        Este proyecto representa la entrega final de la materia Aplicaciones Web y demuestra el dominio de
        las tecnologías modernas de desarrollo web full-stack.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.about__title {
  font-size: 1.6rem;
  color: #1e293b;
  margin: 0 0 1.5rem;
}
.about__content {
  line-height: 1.7;
  color: #475569;
}
.about__content h2 {
  color: #1e293b;
  font-size: 1.2rem;
  margin: 1.5rem 0 0.75rem;
}
.about__content ul {
  padding-left: 1.5rem;
}
.about__content li {
  margin-bottom: 0.4rem;
}
</style>
