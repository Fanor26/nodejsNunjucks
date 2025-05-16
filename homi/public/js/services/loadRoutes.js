import { fetcher } from '../api/fetcher.js';
import { store } from '../store/index.js'; // Importamos el store
import { getFallbackRoutes } from '../utils/fallbackRoutes.js'; // Si no lo tienes, crea este helper

export async function loadRoutes() {
  const token = localStorage.getItem('token');

  try {
    const data = await fetcher({
      url: 'https://15000-fanor26-nodejsnunjucks-12s16nkk8mb.ws-us118.gitpod.io/api/routes',
      token,
      credentials: 'include',
    });

    const routes = Array.isArray(data) ? data : getFallbackRoutes();

    // ✅ Ahora despachamos desde aquí
    store.dispatch({ type: 'SET_ROUTES', payload: routes });

    return routes;
  } catch (error) {
    const fallback = getFallbackRoutes();

    // ✅ También despachamos fallback en caso de error
    store.dispatch({ type: 'SET_ROUTES', payload: fallback });

    return fallback;
  }
}
