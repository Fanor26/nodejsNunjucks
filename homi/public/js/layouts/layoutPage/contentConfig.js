import { routeControllers } from '../../controllers/uiRoutes/index.js';
import { debugLog } from '../../debug.js';
import { findRouteByPath } from '../../utils/filter/index.js';

export const createContent = (routes, currentPath) => {
  const defaultContent = {
    type: 'text',
    content: 'Contenido no disponible',
    styles: { fontSize: '1.2rem', color: '#999' },
  };

  // Validación básica de ruta
  if (!currentPath || !routes?.length) {
    debugLog('Error: Ruta o lista de rutas inválida');
    return {
      area: 'content',
      type: 'container',
      children: [defaultContent],
    };
  }
  const currentRoute = findRouteByPath(routes, currentPath);
  // Obtener contenido inicial
  try {
    const controller = routeControllers[currentRoute.title];
    const content =
      typeof controller === 'function'
        ? controller() // Removed refresh parameter since it's not needed
        : controller || defaultContent;

    return {
      area: 'content',
      type: 'container',
      tag: 'main',

      styles: {
        overflowY: 'auto',
        padding: '20px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'blue',
      },
      children: Array.isArray(content) ? content : [content],
    };
  } catch (error) {
    console.error('Error en createContent:', error);
    return {
      area: 'content',
      type: 'container',
      children: [
        {
          ...defaultContent,
          content: 'Error al cargar contenido',
        },
      ],
    };
  }
};
