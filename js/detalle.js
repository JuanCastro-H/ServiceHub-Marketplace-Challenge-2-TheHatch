const $ = (id) => document.getElementById(id);

function mostrarEstado(estado) {
    ['cargando', 'noencontrado', 'error'].forEach((e) => {
        $(`estado-${e}`).classList.toggle('hidden', e !== estado);
    });
    $('perfil').classList.toggle('hidden', estado !== 'perfil');
}

function renderPerfil(p) {
    return `
    <span class="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">${p.categoria}</span>
    <h1 class="mt-3 text-3xl font-extrabold">${p.nombre}</h1>
    <p class="mt-1 text-slate-700">Zona: ${p.zona}</p>
    <div class="mt-3">${renderStars(p.rating)}</div>

    <h2 class="mt-6 text-lg font-bold">Sobre el servicio</h2>
    <p class="mt-2 text-slate-700">${p.descripcion}</p>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="tel:${p.telefono}"
        class="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
        Llamar al ${p.telefono}
      </a>
      <a href="proveedores.html"
        class="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
        Ver otros proveedores
      </a>
    </div>`;
}

async function cargarDetalle() {
    mostrarEstado('cargando');
    const id = Number(new URLSearchParams(location.search).get('id'));

    try {
        const proveedores = await fetchProviders();
        const proveedor = proveedores.find((p) => String(p.id) === id);

        if (!proveedor) {
            mostrarEstado('noencontrado');
            return;
        }

        document.title = `${proveedor.nombre} | Manos a la Obra`;
        $('perfil').innerHTML = renderPerfil(proveedor);
        mostrarEstado('perfil');
    } catch (err) {
        console.error(err);
        mostrarEstado('error');
    }
}

$('btn-reintentar').addEventListener('click', cargarDetalle);
document.addEventListener('DOMContentLoaded', cargarDetalle);