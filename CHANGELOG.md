# Changelog

Todos los cambios relevantes del proyecto **Manos a la Obra**.

## [1.2.0] - 2026-11-13

### Agregado
- Buscador en la página de proveedores: filtra por nombre, categoría y zona, ignorando tildes y mayúsculas.
- Contador de resultados ("Mostrando X de Y proveedores").
- Estado "sin coincidencias" con botón para limpiar la búsqueda.

> Cambio originado por el feedback de la prueba de usuario #1.

## [1.1.0] - 2026-11-13

### Mejorado (rendimiento)
- Se reemplazó Tailwind por CDN con CSS compilado y minificado.
- Se agregó `defer` a los scripts y la fuente Inter se carga sin bloquear el renderizado.
- Lighthouse (Performance, móvil): de 80 a 97.

## [1.0.0] - 2026-11-13

### Agregado
- Página de Inicio con explicación del problema y botón hacia proveedores.
- Página de Proveedores con tarjetas y datos desde `data/providers.json` mediante `fetch`.
- Estados del listado: cargando, sin resultados y error con botón "Reintentar".
- Página de Detalle (`detalle.html?id=`) con perfil, calificación y botón para llamar.
- Navbar compartida, enlace "Saltar al contenido" y foco visible para navegación por teclado.
- Despliegue en Netlify.

## Pruebas con usuarios

| # | Persona | Tarea asignada | Dificultad encontrada | Comentario textual | Cambio aplicado |
|---|---------|----------------|-----------------------|--------------------|-----------------|
| 1 | Persona 1 | Buscar un plomero de Sajonia y decir su calificación | Ninguna. Completó la tarea sin ayuda (respondió 3.9) | "No tuve ninguna dificultad, está bueno. Si hubiera más proveedores le agregaría un buscador para que la persona que entre pueda encontrar el servicio específico que quiere. El diseño es simple y eficiente, y muy fácil de usar." | Se agregó un buscador por nombre, categoría y zona (v1.2.0) |
| 2 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 3 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 4 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 5 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |