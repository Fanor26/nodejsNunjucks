import { initLayout } from './init/initLayout.js';
import { createLayoutPage } from './layouts/layoutPage/index.js';
import { store } from './store/index.js';
import { debugLog } from './debug.js';
import '../css/app.css';
import { findRouteByPath } from './utils/filter/index.js';
import { navigateTo, updateBrowserPath } from './router/index.js';
import { makeSplitterResizable } from './utils/resizable/resizableSplitter.js';

export const App = async (path) => {
  debugLog('App llamado con path:', path);

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
      return navigateTo(firstAvailableRoute);
    }
    document.title = currentRoute.title || currentRoute.path;
    // 🚀 Solo usas las rutas ya guardadas en el store
    const layout = createLayoutPage(routing.routes,navigateTo, path);
    initLayout([layout], '#app');

    // Esperar al siguiente tick del DOM para asegurar que esté montado
    requestAnimationFrame(() => {
      const container = document.querySelector('.dynamic-layout.page'); // el contenedor grid
      const splitter = container?.querySelector('.splitter'); // el splitter insertado

      if (container && splitter) {
        makeSplitterResizable(container, splitter, { minWidth: 0 });
      }
    });
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
