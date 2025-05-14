import { renderItems } from '../renders/renderItems.js';
import { loadItemsFromAPI } from '../api/itemsApi.js';
import { setCurrentPath } from '../actions/dispatchActions.js';
import { loadContent } from './configUtils.js';
import { setupNavbar } from '../components/common/navigate/index.js';
import { setupSidebar } from '../components/common/navigate/sidebar.js';
import { store } from '../store/index.js';
/**
 * Maneja la carga de contenido y los datos de la API según la ruta.
 * @param {string} routePath - La ruta a cargar.
 */
export async function handleRouteClick(routePath) {
  setCurrentPath(routePath);
  await loadContent(routePath); // Primero cargamos el contenido

  const { typeEndpoint } = store.getState().pageData;

  if (typeEndpoint) {
    const endpoint =
      typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1);

    // Llamamos a la API después de que se haya cargado el contenido
    await loadItemsFromAPI(endpoint);
    renderItems(true); // Renderizamos después de haber obtenido los datos de la API
  } else {
    console.error(
      '❌ No se encontró typeEndpoint al hacer clic en la ruta:',
      typeEndpoint
    );
  }
}
export function initializeNavigation(routes) {
  setupNavbar(routes); // Configura la barra de navegación
  setupSidebar(routes); // Configura el sidebar

  document
    .querySelectorAll('.nav-link') // Se asegura de que cada enlace en el menú tenga su propio manejador de eventos
    .forEach((link) => link.addEventListener('click', handleNavLinkClick));
}
