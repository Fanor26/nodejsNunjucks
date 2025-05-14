import { loadRoutes } from '../services/loadRoutes.js';
import { store } from '../store/index.js';
import { handleRouteChange } from './routerSingle.js';

let prevIsAuthenticated = false;

export const handleAuthChange = async () => {
  const { auth } = store.getState();

  if (auth.isAuthenticated && !prevIsAuthenticated) {
    debugLog('🔑 Login exitoso detectado → Redirigiendo a /dashboard');
    await loadRoutes();
    await handleRouteChange('/dashboard');
  }

  prevIsAuthenticated = auth.isAuthenticated;
};
