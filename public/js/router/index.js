import { store } from '../store/index.js';
import { debugLog } from '../debug.js';
import '../../css/app.css';
import { App } from '../app.js';
export const getCurrentPath = () => window.location.pathname;

export const updateBrowserPath = (path) => {
  window.history.pushState({}, '', path);
  store.dispatch({ type: 'SET_CURRENT_PATH', payload: path });
};

export const navigateTo = (path) => {
  debugLog('Navegando a:', path);
  return App(path);
};
