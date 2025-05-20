import { store } from '../../store/index.js';

export const updateBrowserPath = (path) => {
  window.history.pushState({}, '', path);
  store.dispatch({ type: 'SET_CURRENT_PATH', payload: path });
};

export const getValidatedPath = (path, routes) => {
  // Lógica para validar/ajustar paths
  return path.startsWith('/') ? path : `/${path}`;
};
