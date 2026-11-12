const $ = (id) => document.getElementById(id);

function mostrarEstado(estado) {

    ['cargando', 'vacio', 'error'].forEach((e) => {
        $(`estado-${e}`).classList.toggle('hidden', e !== estado);
    });


    if (estado !== 'lista') $('lista').innerHTML = '';

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

async function cargarProveedores() {

    mostrarEstado('cargando');
    try {
        const proveedores = await fetchProviders();
        if (proveedores.length === 0) {
        mostrarEstado('vacio');
        return;
        }
        mostrarEstado('lista');
        $('lista').innerHTML = proveedores.map(renderTarjeta).join('');
    } catch (err) {
        console.error(err);
        mostrarEstado('error');
    }

}

$('btn-reintentar').addEventListener('click', cargarProveedores);
document.addEventListener('DOMContentLoaded', cargarProveedores);