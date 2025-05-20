// controllers/pageSetup.js
import { renderers } from './renderes.js';
import { setTypeEndpoint, setApiSubItem } from '../actions/dispatchActions.js';
import { debugLog } from '../debug.js';

export function setupPage() {
  const container = createElement('div');

  if (!container) {
    debugLog('No hay contenedor con id "page-container"');
    return;
  }

  const raw = container.dataset.action;
  if (!raw) {
    debugLog('data-action vacío en #page-container');
    return;
  }

  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (err) {
    console.error('JSON inválido en data-action:', raw);
    return;
  }

  const { pageNjk, typeEndpoint, apiSubItem } = cfg;

  if (typeEndpoint) {
    setTypeEndpoint(typeEndpoint);
    debugLog(
      `[setupPage] ✅ setTypeEndpoint ejecutado con: ${typeEndpoint}`,
      'info'
    );
  }

  if (apiSubItem) {
    setApiSubItem(apiSubItem);
    debugLog(
      `[setupPage] ✅ setApiSubItem ejecutado con: ${apiSubItem}`,
      'info'
    );
  }

  const renderFn = renderers[pageNjk];
  if (typeof renderFn !== 'function') {
    debugLog(`No hay renderer definido para "${pageNjk}"`);
    return;
  }

  // Renderiza el contenido
  renderFn(container);
}
