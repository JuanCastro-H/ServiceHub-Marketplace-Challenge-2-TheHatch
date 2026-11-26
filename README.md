# 🔧 Manos a la Obra — "La Batalla Final de la App de Servicios" 🐧⚡

> "Hiring a service shouldn't be an act of faith."

Responsive web app to find and rate local service providers in Asunción, built with vanilla JavaScript and Tailwind CSS.

- 🌐 **Live site:** https://servicehub-marketplace.netlify.app/
- 📦 **Repository:** https://github.com/JuanCastro-H/ServiceHub-Marketplace-Challenge-2-TheHatch

---

## 🎬 Description

This project is the answer to a very local problem: the *Plomero Fantasma*, the plumber who promises to come back tomorrow and never does.

Manos a la Obra is a service marketplace front-end where users can browse providers (plumbers, electricians, locksmiths and more), compare their ratings and contact them directly by phone.

The app behaves as if it were talking to a real backend: provider data lives in a decoupled JSON file, is fetched asynchronously, and every screen handles loading, empty and error states.

The system includes:

- A landing page that explains the problem and leads to the catalog
- A provider catalog with live search
- A provider detail page with profile, rating and a call button
- A shared navigation bar rendered from JavaScript
- Documented usability tests and a Lighthouse optimization report

---

## 🧠 Objective

Practice building a professional, user-centered front-end:

- UI/UX design with clear visual hierarchy
- A single, consistent styling strategy (Tailwind CSS)
- Consuming decoupled data with `fetch`
- Handling real-world UI states (loading, empty, error)
- Accessibility basics (keyboard navigation, labels, contrast)
- Performance optimization measured with Lighthouse
- Usability testing with real people and feedback-driven changes
- Static deployment with Netlify

---

## 🛠️ Technologies Used

### Frontend
- **HTML5**
- **JavaScript (vanilla)**
- **Tailwind CSS 3** (compiled and minified)

### Data
- **JSON** (`data/providers.json`)
- **Fetch API**

### Tooling
- **Tailwind CLI** (CSS build)
- **serve** (local static server)

### Quality & Deployment
- **Lighthouse**
- **Netlify**

---

## 🧩 Project Architecture

The app is made of three static pages that share a small JavaScript layer:

```text
index.html ───────────┐
proveedores.html ─────┼──►  js/app.js  (navbar, stars, data access)
detalle.html ─────────┘          │
        │                        ▼
        │                 data/providers.json
        ▼
js/proveedores.js  (catalog, search, UI states)
js/detalle.js      (profile, UI states)
```

| Piece | Responsibility |
|---|---|
| `js/app.js` | Shared code: renders the navbar, renders star ratings, and exposes `fetchProviders()` as the single data access point |
| `js/proveedores.js` | Loads the catalog, renders cards, handles search and UI states |
| `js/detalle.js` | Reads the provider `id` from the URL, renders the profile and handles UI states |
| `data/providers.json` | Provider data source, decoupled from the HTML |

`fetchProviders()` acts like a backend client: swapping the JSON file for a real API would only require changing that one function. It also adds a 2-second artificial delay to simulate network latency and exercise the loading state.

---

## ⚙️ How It Works

### 🔹 General Flow

1. The user lands on the home page and reads the problem and the 3-step explanation.
2. The call to action leads to the provider catalog.
3. The catalog shows a loading state while data is fetched from the JSON file.
4. Provider cards appear with name, category, zone, visual rating and two actions.
5. The user filters providers with the search box.
6. "Ver detalle" opens `detalle.html?id=<id>`, which loads the selected profile.
7. From the profile, the user can call the provider (`tel:` link) or return to the catalog.

### 🔹 UI States

| Page | State | When |
|---|---|---|
| Catalog | ⏳ Loading | While providers are being fetched |
| Catalog | 🚫 Empty | The data source returns no providers |
| Catalog | ❌ Error | The fetch fails, with a **Retry** button |
| Catalog | 🔎 No matches | The search returns nothing, with a **Clear search** button |
| Detail | ⏳ Loading | While the profile is being fetched |
| Detail | 🚫 Not found | The `id` in the URL doesn't match any provider |
| Detail | ❌ Error | The fetch fails, with a **Retry** button |

### 🔹 Search

The search box filters the catalog in real time by **name, category and zone**.

Text is normalized before comparing (lowercase, accents removed), so `plomeria` finds *Plomería* and `mburucuya` finds *Mburucuyá*. A counter shows "Mostrando X de Y proveedores".

---

## 📦 Data Model

Each provider in `data/providers.json` looks like this:

```json
{
  "id": 6,
  "nombre": "Cerrajería Llave Maestra",
  "categoria": "Cerrajería",
  "rating": 4.9,
  "telefono": "0981000006",
  "zona": "Centro",
  "descripcion": "Apertura de puertas y cambio de cerraduras, urgencias 24 hs."
}
```

The dataset has 14 providers across 8 categories and 6 zones of Asunción.

---

## ♿ Accessibility

- Page language declared (`lang="es"`)
- "Saltar al contenido" skip link for keyboard users
- Visible focus rings on every interactive element
- A `<label>` on the search input
- `aria-live` regions announce loading, error and result-count changes
- `aria-current="page"` on the active navigation link
- Star ratings expose a text alternative (e.g. "Calificación: 4.8 de 5")
- Responsive layout and text colors chosen for contrast

---

## 🚦 Performance (Lighthouse)

Measured on mobile over `proveedores.html`:

| Category | Before | After |
|---|---:|---:|
| Performance | 80 | **97** |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

**Improvements applied:**

1. **Tailwind CDN replaced by compiled, minified CSS.** Removed the in-browser style compiler, which cut JavaScript execution time (1.5 s) and main-thread work (3.0 s) warnings.
2. **Scripts loaded with `defer` and the Inter font loaded without blocking rendering.** JS and fonts no longer delay the first paint.

| Before | After |
|---|---|
| ![Lighthouse before](docs/lighthouse-antes.png) | ![Lighthouse after](docs/lighthouse-despues.png) |

---

## 👥 User Testing

The app was tested with 5 real people, each with a specific task (e.g. "find a plumber in Sajonia and tell me their rating"). For each test, the task, difficulty found, verbatim comment and applied change are documented in [`CHANGELOG.md`](CHANGELOG.md).

| Feedback received | Outcome |
|---|---|
| Add a search box to find a specific service | ✅ Implemented in v1.2.0 (search by name, category and zone) |
| Add a category filter (mentioned by 4 of 5 testers) | 🛠️ Planned |
| Filters by zone and rating, sorting by score | 🛠️ Planned |
| Login, reviews, profile photos, internal chat | 💡 Out of scope (need backend and authentication) |

---

## 📂 Project Structure

```text
ServiceHub-Marketplace-Challenge-2-TheHatch/

├── index.html
├── proveedores.html
├── detalle.html
│
├── data/
│   └── providers.json
│
├── js/
│   ├── app.js
│   ├── proveedores.js
│   └── detalle.js
│
├── src/
│   └── input.css
├── css/
│   └── styles.css          # compiled by Tailwind
│
├── docs/                    # Lighthouse evidence
│
├── tailwind.config.js
├── serve.json
├── package.json
├── CHANGELOG.md
└── README.md
```

---

## 🚀 Installation

### 1. Clone repository

```bash
git clone https://github.com/JuanCastro-H/ServiceHub-Marketplace-Challenge-2-TheHatch.git
cd ServiceHub-Marketplace-Challenge-2-TheHatch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the CSS

```bash
npm run build:css
```

Run this command again whenever you change Tailwind classes in the HTML files or in `js/`.

---

## ▶️ Usage

Start a local static server:

```bash
npx serve
```

Then open:

```text
http://localhost:3000/index.html
```

> ⚠️ Don't open the HTML files by double-clicking them. The app uses `fetch`, which doesn't work over the `file://` protocol.

---

## 🌍 Deployment

The site is fully static and the compiled CSS is committed to the repository, so no build step is needed on the server.

1. Push the repository to GitHub.
2. In Netlify: **Add new site** → **Import an existing project** → GitHub → select the repository.
3. Leave **Build command** and **Publish directory** empty.
4. Click **Deploy**.

Every `git push` to `main` redeploys automatically.

---

## 📈 Key Features

✔ Three real pages: home, catalog and provider detail  
✔ Data loaded from a decoupled JSON source with `fetch`  
✔ Loading, empty and error states on the catalog and the detail page  
✔ Real-time search by name, category and zone, ignoring accents and case  
✔ Result counter and "no matches" state with a clear button  
✔ Visual star ratings with accessible text  
✔ Clickable `tel:` links to call providers  
✔ Shared navbar with active-page highlight  
✔ Responsive layout  
✔ Keyboard navigation and skip link  
✔ Tailwind CSS as the only styling strategy  
✔ Lighthouse Performance improved from 80 to 97  
✔ Documented usability tests and changelog  
✔ Deployed on Netlify  

---

## 🧃 Possible Improvements

- Category filter chips (the most requested feature in user tests)
- Filters by zone and minimum rating, plus sorting by score
- Replace the JSON file with a real API or `json-server`
- Provider reviews and profile photos
- Basic login and provider registration
- Google Maps integration
- Smooth transitions and micro-interactions
- Automated accessibility checks in CI

---

## 👨‍💻 Author

**Juan Castro**

---

# 🇪🇸 Resumen en Español

Manos a la Obra es una aplicación web para encontrar y calificar proveedores de servicios locales en Asunción: plomeros, electricistas, cerrajeros y más. Nace como respuesta al clásico "Plomero Fantasma": el que promete volver mañana y desaparece.

La app permite explorar un catálogo de proveedores, buscarlos por nombre, categoría o zona, ver su perfil con calificación y llamarlos directamente.

---

## 🎯 Objetivo

El proyecto fue desarrollado para practicar:

- diseño UI/UX con jerarquía visual clara,
- una única estrategia de estilos consistente (Tailwind CSS),
- consumo de datos desacoplados con `fetch`,
- manejo de estados reales de interfaz (cargando, sin resultados, error),
- accesibilidad básica y navegación por teclado,
- optimización de rendimiento medida con Lighthouse,
- pruebas de usabilidad con personas reales,
- despliegue de un sitio estático en Netlify.

---

## ⚙️ Funcionamiento

- La página de inicio explica el problema y lleva al catálogo.
- El catálogo carga los proveedores desde un archivo JSON y muestra tarjetas con nombre, categoría, zona y calificación.
- El buscador filtra en tiempo real, sin importar tildes ni mayúsculas.
- Cada tarjeta lleva a una página de detalle con la descripción del servicio y un botón para llamar.
- Todas las pantallas contemplan los estados de carga, error y falta de resultados.

---

## 📊 Características destacadas

- Tres páginas reales con navegación compartida
- Datos desacoplados del HTML mediante JSON y `fetch`
- Buscador en tiempo real con contador de resultados
- Estados de carga, vacío, error y sin coincidencias
- Accesibilidad: enlace para saltar al contenido, foco visible y etiquetas claras
- Rendimiento en Lighthouse mejorado de 80 a 97
- Cinco pruebas de usabilidad documentadas en el CHANGELOG
- Despliegue continuo en Netlify

---

## 🧠 Conclusión

El proyecto demuestra cómo construir una experiencia web clara, rápida y usable: datos desacoplados, estados de interfaz bien manejados, accesibilidad básica y decisiones guiadas por la opinión de usuarios reales.

Este enfoque permite:
- cambiar la fuente de datos por una API real sin reescribir las pantallas,
- medir y justificar mejoras de rendimiento con evidencia,
- priorizar funcionalidades según el feedback recibido,
- y mantener un código organizado y fácil de ampliar.
