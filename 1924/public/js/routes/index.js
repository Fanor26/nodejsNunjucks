import { setupNavbar } from '../components/common/navbar.js';

export function loadRoutes(routes) {
  try {
    const navbar = document.getElementById('navbar');
    if (!navbar) {
      console.error('❌ No se encontró el elemento de menú en el DOM.');
      return;
    }

    navbar.innerHTML = ''; // Limpiar menú antes de insertar rutas

    routes.forEach((route) => {
      const link = document.createElement('a');
      link.href = route.path;
      link.textContent = route.title;

      // Estilos opcionales
      link.style.color = 'white';
      link.style.textDecoration = 'none';
      link.style.padding = '8px 16px';
      link.style.display = 'block';

      navbar.appendChild(link);
    });

    console.log('✅ Rutas cargadas correctamente.');

    // Llamar a setupNavbar después de cargar las rutas

  } catch (error) {
    console.error('❌ Error al cargar rutas:', error);
  }
}
