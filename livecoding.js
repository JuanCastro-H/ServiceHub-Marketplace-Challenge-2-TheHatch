const NAV_LINKS = [
    { href: 'index.html', label: 'Inicio' },            // Inicio.
    { href: 'proveedores.html', label: 'Proveedores' }, // Proveedores.
];



function renderNavbar() {

    const nav = document.getElementById("navbar");
    if(!nav) return ;

    nav.innerHTML = `
        <a  href="index.html">Manos A La Obra</a>
    `

    const links = NAV_LINKS.map(link => {

        return `
        <li>
            <a herf="${herf}">${label}</a>
        </li>
        `
    }).join("")

};


