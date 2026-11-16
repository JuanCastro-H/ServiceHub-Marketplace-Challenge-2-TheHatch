// --- OBtener Id ---
const $ = (id) => document.getElementById(id);

// --- Lista De Proveedores ---
let todos = [];


// --- Normalizar Texto De Busqueda : "Plomería" -> "plomeria" ---
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// --- Mostrar Estado De La Pagina ---
function mostrarEstado(estado) {

    // --- Compara Estados Buscando El Actual Para Mostrarlo ---
    ['cargando', 'vacio', 'error', 'sin-coincidencias'].forEach((e) => {
        $(`estado-${e}`).classList.toggle('hidden', e !== estado);
    });

    // --- Si No Se Carga El Estado Lista ---
    if (estado !== 'lista') {
        $('lista').innerHTML = '';       // Borra las tarjetas de proveedores 
        $('contador').textContent = '';  // Borra el texto del contador (ej. "Mostrando 5 proveedores")
    }
}

function renderTarjeta(p) {
    return `
    <! --- Contenedor De La Tarjeta -->
    <li class="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">

        <!-- Rubro/Categoria -->
        <span class="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">${p.categoria}</span>

        <!-- Nombre Del Proveedor -->
        <h2 class="mt-3 text-lg font-bold">${p.nombre}</h2>

        <!-- Ubicación -->
        <p class="text-sm text-slate-700">${p.zona}</p>

        <!-- Raiting -->
        <div class="mt-2">${renderStars(p.rating)}</div>

        <!-- Contenedor Para Fila De Botones -->
        <div class="mt-auto flex gap-2 pt-4">

            <!-- Boton Para Ver Detalles Del Proveedor -->
            <a href="detalle.html?id=${p.id}"
            class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
            Ver detalle
            </a>

            <!-- Boton Para Llamar -->
            <a href="tel:${p.telefono}" aria-label="Llamar a ${p.nombre}"
                class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
                Llamar
            </a>
        
        </div>
    </li>`;
}


// --- Filtro Para Buscar A Un Proveedor (Nombre, Oficio, Zona)---
function aplicarFiltro() {

    // --- Obtener Input Del Usuario ---
    const termino = normalizar($('buscador').value.trim());

    // --- Convertir Caracteristicas De Proveedores En Una Frase ---
    const resultados = todos.filter((p) =>
        normalizar(`${p.nombre} ${p.categoria} ${p.zona}`).includes(termino) // Verificar si esa frase incluye lo escrito por el usuario.
    );

    // --- Si No Hay Resultados ---
    if (resultados.length === 0) {          // Muestra el aviso de "No encontramos resultados" y limpia la lista
        mostrarEstado('sin-coincidencias');
        return;
    }

    // --- Si Hay Resultados Muestra La Lista ---
    mostrarEstado('lista');

    // --- Crear tarjetas Para Los Proveedores Encontrados ---
    $('lista').innerHTML = resultados.map(renderTarjeta).join('');

    // --- Aactualizar Contador ---
    $('contador').textContent = `Mostrando ${resultados.length} de ${todos.length} proveedores`;
}


// --- Logica Para Cargar Y Mostrar Proveedores ---
async function cargarProveedores() {

    // --- Mostrar Mensaje De Carga ---
    mostrarEstado('cargando');


    try {
        // --- Obtener Lista De Proveedores ---
        todos = await fetchProviders();

        // --- Verificar Información ---
        if (todos.length === 0) {
            mostrarEstado('vacio');    // Mostrar Mensaje De Falta De Datos.
            return;
        }

        // --- Activar Filtro ---
        aplicarFiltro();

    } catch (err) {
        console.error(err);            // Imprimir Error.
        mostrarEstado('error');        // Mostrar Pantalla De Error.
    }
}

// --- Escuchar Input Del Usuario En Tiempo Real ---
$('buscador').addEventListener('input', () => {
    if (todos.length > 0) aplicarFiltro();
});

// --- Boton De Limpiar Busqueda ---
$('btn-limpiar').addEventListener('click', () => {
    $('buscador').value = '';
    aplicarFiltro();
    $('buscador').focus();
});

// --- Boton De Reintento ---
$('btn-reintentar').addEventListener('click', cargarProveedores);

// --- Arranque De Logica Al Cargase El HTML ---
document.addEventListener('DOMContentLoaded', cargarProveedores);