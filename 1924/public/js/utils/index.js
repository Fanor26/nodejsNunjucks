import { store } from '../store/index.js';
import { loadRoutes } from './configUtils.js';

// utils/fakeData.js
export function generateEmptyItems(count = 10, keys = []) {
  return Array.from({ length: count }, () => {
    const obj = {};
    keys.forEach((key) => {
      obj[key] = '—'; // Placeholder vacío
    });
    return obj;
  });
}
export // Función para actualizar los números de fila
function updateRowNumbers() {
  const rows = document.querySelectorAll('.selectable-row');
  rows.forEach((row, index) => {
    const numeroCell = row.querySelector('td:first-child'); // Obtener la celda del número (N°)
    if (numeroCell) {
      numeroCell.textContent = index + 1; // Reasignar el número de fila
    }
  });
}
// authWatcher.js

let prevAuthState = store.getState().auth.isAuthenticated;

export function watchAuthChanges() {
  store.subscribe(async () => {
    const currentAuth = store.getState().auth.isAuthenticated;
    if (currentAuth !== prevAuthState) {
      console.log('🔄 isAuthenticated ha cambiado:', currentAuth);

      // ☑️ Actualiza rutas según el nuevo estado
      const newRoutes = await loadRoutes();
      store.dispatch({ type: 'SET_ROUTES', payload: newRoutes });

      prevAuthState = currentAuth;
    }
  });
}
