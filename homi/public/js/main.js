// src/index.js (main entry point)
import { domReady } from './utils/dom.js';
import { createDebugUI } from './debug.js';
import '../css/styles.css';

import { store } from './store/index.js';
import { debugLog } from './debug.js';
import { loadRoutes } from './services/loadRoutes.js';
import {
  findRouteByPath,
  getCurrentPath,
  handleRouteChange,
} from './router/routerSingle.js';
import { checkSession } from './actions/authActions.js';

// Importamos las funciones del Tree Viewer
import { renderTreeViewer, safeUpdateTreeViewer } from './redux/treeView.js';
const initializeApp = async () => {
  try {
    // Paso 1: Crea la interfaz de depuración si es necesario
    createDebugUI();
    renderTreeViewer(store.getState());

    // Paso 3: Verifica la sesión
    await store.dispatch(checkSession());

    // Paso 4: Determina la ruta inicial
    const currentPath = getCurrentPath();
    store.dispatch({ type: 'SET_CURRENT_PATH', payload: currentPath });

    // document.title = currentPath?.title || 'Mi App'; // Actualiza el título correctamente
    // Paso 2: Carga las rutas
    await loadRoutes();
    // Forzamos el cambio de ruta con la información de autenticación actualizada
    await handleRouteChange(currentPath);

    // Escucha los cambios de estado de autenticación y actualiza las rutas en consecuencia
    let previousAuthState = store.getState().auth.isAuthenticated;

    store.subscribe(() => {
      const currentAuthState = store.getState().auth.isAuthenticated;
      if (currentAuthState !== previousAuthState) {
        previousAuthState = currentAuthState;
        const currentPath = getCurrentPath();
        handleRouteChange(currentPath);
      }

      // Actualiza el árbol de estado visualmente
      safeUpdateTreeViewer(store.getState());
    });

    // Paso 5: Cuando todo esté listo, mostramos el contenido de la app
    document.body.style.display = 'block'; // Muestra el body
  } catch (error) {
    console.error('Error inicializando la app:', error);
    safeUpdateTreeViewer({ error: error.message, stack: error.stack });
  }
};

domReady.then(initializeApp);
