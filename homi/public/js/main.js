// src/index.js (main entry point)
import { domReady } from './utils/dom.js';
import { createDebugUI } from './debug.js';
import '../css/styles.css';

import { store } from './store/index.js';
import { debugLog } from './debug.js';
import { loadRoutes } from './services/loadRoutes.js';
import { getCurrentPath, handleRouteChange } from './router/routerSingle.js';
import { checkSession } from './actions/authActions.js';

// Importamos las funciones del Tree Viewer
import { renderTreeViewer, safeUpdateTreeViewer } from './redux/treeView.js';
const initializeApp = async () => {
  try {
    createDebugUI();
    renderTreeViewer(store.getState());

    // 1) Carga rutas y despacha internamente
    await loadRoutes();

    // 2) Verifica sesión ANTES de cambiar ruta
    await store.dispatch(checkSession());

    // 3) Ahora decide la ruta inicial
    const currentPath = getCurrentPath();
    store.dispatch({ type: 'SET_CURRENT_PATH', payload: currentPath });
    await handleRouteChange(currentPath);

    // 4) Suscripción al Tree Viewer
    store.subscribe(() => safeUpdateTreeViewer(store.getState()));
  } catch (error) {
    console.error('Error inicializando la app:', error);
    safeUpdateTreeViewer({ error: error.message, stack: error.stack });
  }
};

domReady.then(initializeApp);
