import { store } from '../store/index.js';
// dispatchActions.js
import store from './store';

export const dispatch = dispatch;

export function setCurrentPath(path) {
  dispatch({ type: 'SET_CURRENT_PATH', payload: path });
}
// dispatchActions.js
export const resetPageData = () => ({
  type: 'RESET_PAGE_DATA',
});

// Función para activar un ítem
export function activateItem(_id) {
  dispatch({ type: 'ACTIVATE', payload: { _id } });
}

// Función para desactivar un ítem
export function deactivateItem(_id) {
  dispatch({ type: 'DEACTIVATE', payload: { _id } });
}

// Función para actualizar un ítem
export function updateItem(_id, updates) {
  dispatch({ type: 'UPDATE', payload: { _id, updates } });
}

// Función para eliminar un ítem
export function deleteItem(_id) {
  dispatch({ type: 'DELETE', payload: { _id } });
}

// Función para eliminar múltiples ítems en masa
export function deleteItemsBulk(ids) {
  dispatch({ type: 'DELETE_BULK', payload: { ids } });
}
// Acción para actualizar los ítems
export function updateItems(items) {
  return {
    type: 'UPDATE_ITEMS',
    payload: items,
  };
}

// Función para hacer logout
export function logoutDispatch() {
  dispatch({ type: 'LOGOUT' });
}

export function setTypeEndpoint(typeEndpoint) {
  dispatch({ type: 'SET_TYPE_ENDPOINT', payload: typeEndpoint });
}

export function setApiSubItem(apiSubItem) {
  dispatch({ type: 'SET_API_SUBITEM', payload: apiSubItem });
}
