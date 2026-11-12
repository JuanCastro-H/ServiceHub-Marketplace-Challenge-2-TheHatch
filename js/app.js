// --- Configuración De Enlaces ---
const NAV_LINKS = [
    { href: 'index.html', label: 'Inicio' },            // Inicio.
    { href: 'proveedores.html', label: 'Proveedores' }, // Proveedores.
];

// --- Genera Y Inserta Dinamicamente La Barra De Navegación en el DOM  ---
function renderNavbar() {

    // --- Buscar Etiqueta Con Identificador ---
    const nav = document.getElementById('navbar');
    if (!nav) return; // Detener para evitar erroes.


    // --- Detectar pagina actual ---
    let current = location.pathname.split('/').pop() || 'index.html';
    if (current === 'detalle.html') current = 'proveedores.html';     // Mantiene resaltadaa la seccion "Proveedores" desde la vista de detalle


    // --- Contruye El HTML De Cada Enlace Evaluado ---
    const links = NAV_LINKS.map(({ href, label }) => {

        const active = href === current;
        return `
            <li>
            <a href="${href}"
                ${active ? 'aria-current="page"' : ''}
                class="rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                        ${active ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-200'}">
                ${label}
            </a>
            </li>`;
    }).join(''); // Une todos los <li> en un solo string sin separadores

    // --- Insertar Estructura HTML Del Navbar en el contenedor + Lista De Enlaces ---
    nav.innerHTML = `
    <nav aria-label="Navegación principal"
            class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="index.html"
            class="rounded-md text-lg font-bold text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
        Manos a la Obra
        </a>
        <ul class="flex gap-1">${links}</ul>
    </nav>`;
}


// --- Ejecuta la función una vez que el documento HTML haya terminado de cargarse ---
document.addEventListener('DOMContentLoaded', renderNavbar);