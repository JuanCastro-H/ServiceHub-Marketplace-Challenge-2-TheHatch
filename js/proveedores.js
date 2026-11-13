const $ = (id) => document.getElementById(id);

let todos = [];

// Quita tildes y pasa a minúsculas: "Plomería" -> "plomeria"
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function mostrarEstado(estado) {
    ['cargando', 'vacio', 'error', 'sin-coincidencias'].forEach((e) => {
        $(`estado-${e}`).classList.toggle('hidden', e !== estado);
    });
    if (estado !== 'lista') {
        $('lista').innerHTML = '';
        $('contador').textContent = '';
    }
}

function renderTarjeta(p) {
    return `
    <li class="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <span class="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">${p.categoria}</span>
        <h2 class="mt-3 text-lg font-bold">${p.nombre}</h2>
        <p class="text-sm text-slate-700">${p.zona}</p>
        <div class="mt-2">${renderStars(p.rating)}</div>
        <div class="mt-auto flex gap-2 pt-4">
            <a href="detalle.html?id=${p.id}"
            class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
            Ver detalle
            </a>
            <a href="tel:${p.telefono}" aria-label="Llamar a ${p.nombre}"
                class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
                Llamar
            </a>
        </div>
    </li>`;
}

function aplicarFiltro() {
    const termino = normalizar($('buscador').value.trim());
    const resultados = todos.filter((p) =>
        normalizar(`${p.nombre} ${p.categoria} ${p.zona}`).includes(termino)
    );

    if (resultados.length === 0) {
        mostrarEstado('sin-coincidencias');
        return;
    }

    mostrarEstado('lista');
    $('lista').innerHTML = resultados.map(renderTarjeta).join('');
    $('contador').textContent = `Mostrando ${resultados.length} de ${todos.length} proveedores`;
}

async function cargarProveedores() {
    mostrarEstado('cargando');
    try {
        todos = await fetchProviders();
        if (todos.length === 0) {
            mostrarEstado('vacio');
            return;
        }
        aplicarFiltro();
    } catch (err) {
        console.error(err);
        mostrarEstado('error');
    }
}

$('buscador').addEventListener('input', () => {
    if (todos.length > 0) aplicarFiltro();
});

$('btn-limpiar').addEventListener('click', () => {
    $('buscador').value = '';
    aplicarFiltro();
    $('buscador').focus();
});

$('btn-reintentar').addEventListener('click', cargarProveedores);
document.addEventListener('DOMContentLoaded', cargarProveedores);