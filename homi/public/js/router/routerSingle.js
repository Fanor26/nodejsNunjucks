import { initLayout } from '../init/initLayout.js';
import { createLayoutPage } from '../layouts/layoutPage/index.js';
import { store } from '../store/index.js';
import { debugLog } from '../debug.js';
import '../../css/app.css';
export const getCurrentPath = () => window.location.pathname;

export const updateBrowserPath = (path) => {
  window.history.pushState({}, '', path);
  store.dispatch({ type: 'SET_CURRENT_PATH', payload: path });
};
export const findRouteByPath = (routes, path) => {
  let exactMatch = null;
  let partialMatch = null;

  const search = (routesList) => {
    for (const route of routesList) {
      if (route.path === path) {
        exactMatch = route;
        return;
      }
      if (path.startsWith(route.path)) {
        if (!partialMatch || route.path.length > partialMatch.path.length) {
          partialMatch = route;
        }
      }
      if (route.children) {
        search(route.children);
      }
    }
  };

  search(routes);

  return exactMatch || partialMatch || null;
};

export const handleRouteChange = async (path) => {
  debugLog('handleRouteChange llamado con path:', path);

  updateBrowserPath(path);

  try {
    const { routing } = store.getState();

    const currentRoute = findRouteByPath(routing.routes, path);
    if (!currentRoute) {
      // Buscar primera ruta accesible en routing.routes
      const firstAvailableRoute = routing.routes[0]?.path || '/';

      debugLog(
        `Ruta ${path} no permitida. Redirigiendo a ${firstAvailableRoute}`
      );
      return handleRouteChange(firstAvailableRoute);
    }
    document.title = currentRoute.title || currentRoute.path;
    // 🚀 Solo usas las rutas ya guardadas en el store
    const layout = createLayoutPage(routing.routes, handleRouteChange, path);
    initLayout([layout], '#app');
  } catch (error) {
    console.error('Error al cambiar ruta:', error);
    initLayout(
      [
        {
          role: 'error',
          elements: [
            {
              type: 'text',
              content: `Error al cargar ${path}`,
              styles: { color: 'red' },
            },
          ],
        },
      ],
      '#app'
    );
  }
};
