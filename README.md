# Hola# Manos a la Obra

App web para encontrar y calificar proveedores de servicios locales en Asunción (plomeros, electricistas y más). Creada para el reto "La Batalla Final de la App de Servicios".

- **Sitio desplegado:** https://servicehub-marketplace.netlify.app/
- **Repositorio:** https://github.com/JuanCastro-H/ServiceHub-Marketplace-Challenge-2-TheHatch

## Páginas

1. **Inicio** (`index.html`): explica el problema y lleva al listado.
2. **Proveedores** (`proveedores.html`): tarjetas con nombre, categoría, calificación y acciones. Incluye buscador y los estados cargando, sin resultados y error.
3. **Detalle** (`detalle.html?id=`): perfil completo del proveedor con botón para llamar.

Los datos viven en `data/providers.json` y se consumen con `fetch`, no están escritos en el HTML.

## Tecnologías

HTML, JavaScript vanilla y **Tailwind CSS** (única estrategia de estilos, compilado a `css/styles.css`).

## Cómo ejecutar

```bash
git clone https://github.com/JuanCastro-H/ServiceHub-Marketplace-Challenge-2-TheHatch
cd app-servicios-asuncion
npm install
npm run build:css
npx serve
```

Abre `http://localhost:3000/index.html`. No abras los HTML con doble clic: el `fetch` no funciona desde `file://`.

Si modificas clases de Tailwind en los HTML o en `js/`, vuelve a correr `npm run build:css`.

## Cómo desplegar

El sitio es estático, no necesita build en el servidor (el CSS compilado está en el repositorio).

1. Sube el repositorio a GitHub.
2. En Netlify: **Add new site** → **Import an existing project** → GitHub → elige el repositorio.
3. Deja vacíos el *Build command* y el *Publish directory*.
4. Haz clic en **Deploy**. Cada `git push` a `main` redespliega automáticamente.

## Accesibilidad

- Idioma declarado (`lang="es"`), etiquetas `<label>` en el buscador y navegación por teclado con foco visible.
- Enlace "Saltar al contenido".
- Calificación con texto alternativo para lectores de pantalla.
- Diseño responsive y colores con contraste adecuado.

## Evidencia Lighthouse

Medición en móvil sobre `proveedores.html`.

| Categoría | Antes | Después |
|---|---|---|
| Performance | 80 | 97 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

**Mejoras aplicadas:**

1. **Tailwind por CDN reemplazado por CSS compilado y minificado.** Eliminó el script que compilaba estilos en el navegador, lo que quitó los avisos de tiempo de ejecución de JavaScript (1.5 s) y trabajo del hilo principal (3.0 s).
2. **Scripts con `defer` y fuente Inter cargada sin bloquear el renderizado.** Evita que el JS y la fuente retrasen el primer pintado.

| Antes | Después |
|---|---|
| ![Lighthouse antes](docs/lighthouse-antes.png) | ![Lighthouse después](docs/lighthouse-despues.png) |

## Pruebas con usuarios

El detalle de las pruebas y los cambios aplicados está en [CHANGELOG.md](CHANGELOG.md).

## Estructura

```
├── index.html
├── proveedores.html
├── detalle.html
├── data/providers.json
├── js/
│   ├── app.js
│   ├── proveedores.js
│   └── detalle.js
├── src/input.css
├── css/styles.css
├── docs/
├── tailwind.config.js
├── CHANGELOG.md
└── README.md
```