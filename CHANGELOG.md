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
| 1 | Persona 1 | Buscar un plomero de Sajonia y decir su calificación | Ninguna. Respondió 3.9 | "No tuve ninguna dificultad, está bueno. Si hubiera más proveedores le agregaría un buscador para que la persona que entre pueda encontrar el servicio específico que quiere. El diseño es simple y eficiente, y muy fácil de usar." | Buscador por nombre, categoría y zona (v1.2.0) |
| 2 | Jorge | Entrar a proveedores, buscar uno, ver su detalle, volver al listado y de ahí al inicio | Completó el recorrido. Le resultó desordenada la información de categorías, mezclada con los nombres | "Abre muy rápido, se puede deslizar con fluidez. Lo que no me gustó es que está desordenada la información de las categorías, mezclada con nombres. Debería haber una línea de categorías (plomería, electricidad, cerrajería...) donde al tocar una se abran las empresas de ese servicio. Falta más detalle de los servicios." | Filtro por categoría (v1.3.0) |
| 3 | Aura | Buscar un proveedor de cerrajería y decir los detalles de su servicio | Respondió con la descripción de aire acondicionado, no la de cerrajería: se equivocó de proveedor al buscar entre todo el listado. Ella indicó "ninguna" dificultad | "Instalación y mantenimiento de aire acondicionado. Dificultad ninguna. Le agregaría más descripción del servicio." | Filtro por categoría (v1.3.0) |
| 4 | Miguel | Buscar un proveedor de cerrajería, entrar al detalle y decir qué ve en "Sobre el servicio" | Ninguna con la tarea (respondió: apertura de puertas y cambio de cerraduras, urgencias 24 hs) | "La principal mejora es que tiene que haber un inicio de sesión, porque desde ahí se comienza a trabajar las otras mejoras. [...] También unos filtros para filtrar por zona, por nivel de estrellas, por tipo de servicio." | Filtro por categoría (v1.3.0). Pendiente a futuro: filtros por zona y estrellas, login, chat interno |
| 5 | Orlando | Encontrar al proveedor con la calificación más baja y decir su nombre y detalles | Ninguna reportada | "Que tenga una sección de comentarios, donde los clientes opinan sobre cada trabajador, y que haya un filtro de mejores puntuados, orden alfabético, por profesión. Agregar también una foto de perfil." | Filtro por categoría (v1.3.0). Pendiente a futuro: orden por puntuación, comentarios y foto de perfil |

### Ideas fuera del alcance de este reto
Inicio de sesión, chat interno, comentarios, fotos de perfil y orden por puntuación. Requieren backend y autenticación.