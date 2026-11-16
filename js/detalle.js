// --- Obtener Id Del Perfil ---
const $ = (id) => document.getElementById(id);


// --- Mostrar Estado De La Pagina ---
function mostrarEstado(estado) {

    // --- Verificar Lista Con Los 3 Estados De Aviso ---
    ['cargando', 'noencontrado', 'error'].forEach((e) => {
        $(`estado-${e}`).classList.toggle('hidden', e !== estado);
    });
    $('perfil').classList.toggle('hidden', estado !== 'perfil');
}

// --- Crear Perfil Detallado ---
function renderPerfil(p) {
    return `
    <!-- Mostrar Rubro/Categoria --->
    <span class="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">${p.categoria}</span>

    <!-- Nombre Del Proveedor -->
    <h1 class="mt-3 text-3xl font-extrabold">${p.nombre}</h1>

    <!-- Ubicación -->
    <p class="mt-1 text-slate-700">Zona: ${p.zona}</p>

    <!-- Mostrar Raiting -->
    <div class="mt-3">${renderStars(p.rating)}</div>

    <!-- Descripcion Del Oficio -->
    <h2 class="mt-6 text-lg font-bold">Sobre el servicio</h2>
    <p class="mt-2 text-slate-700">${p.descripcion}</p>

    <!-- Zona De Botones -->
    <div class="mt-8 flex flex-col gap-3 sm:flex-row"> <!-- 'flex-col' botones uno debajo en cel; 'sm:flex-row' lado a lado en pantallas -->

        <!-- Boton De Llamadas (Abre La App) -->
        <a href="tel:${p.telefono}"
            class="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
            Llamar al ${p.telefono}
        </a>

        <!-- Boton Para Volver A Lista De Proveedores -->
        <a href="proveedores.html"
            class="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
            Ver otros proveedores
        </a>

    </div>`;
}



async function cargarDetalle() {

    // --- Mostrar Mensaje De Carga ---
    mostrarEstado('cargando');

    // --- Obtiene El Id Del Proveedor De La URL ---
    const id = new URLSearchParams(location.search).get('id');

    try {   

        // --- Pedir Lista De Proveedores ---
        const proveedores = await fetchProviders();

        // --- Obtener Proveedor Por Su ID ---
        const proveedor = proveedores.find((p) => String(p.id) === id);

        // --- Verificar Si Existe Proveedor ---
        if (!proveedor) {
            mostrarEstado('noencontrado');   // Muestra el cartel de "Proveedor no encontrado"
            return;
        }

        // --- Cambiar Titulo De La Pestaña ---
        document.title = `${proveedor.nombre} | Manos a la Obra`;

        // --- Ejecutar Función Para Construir El HTML Del Perfil ---
        $('perfil').innerHTML = renderPerfil(proveedor);

        // --- Mostrar Perfil ---
        mostrarEstado('perfil');

    } catch (err) {
        console.error(err);      // Imprimir error
        mostrarEstado('error');  // Mostrar Ventana de error
    }
}

// --- Evento De Reintento ---
$('btn-reintentar').addEventListener('click', cargarDetalle);

// --- Cargar Detalles Cuando Se Cree El HTML ---
document.addEventListener('DOMContentLoaded', cargarDetalle);