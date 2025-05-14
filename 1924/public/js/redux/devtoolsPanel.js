// devtoolsPanel.js

import { store } from '../store/index.js';

export function initDevtoolsPanel() {
  const panel = document.getElementById('devtools-panel');
  if (!panel) return;

  function renderState() {
    const state = store.getState();
    panel.innerHTML = `<pre>${JSON.stringify(state, null, 2)}</pre>`;
  }

  // Render inicial
  renderState();

  // Escuchar cambios
  store.subscribe(renderState);
}
