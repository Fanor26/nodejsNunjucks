import { store } from '../store/index.js';

export function renderStateDebug() {
  const state = store.getState(); // Obtén el estado completo del store

  const debugContainer = document.createElement('div');
  debugContainer.style.position = 'fixed';
  debugContainer.style.top = '0';
  debugContainer.style.left = '0';
  debugContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  debugContainer.style.color = 'white';
  debugContainer.style.padding = '10px';
  debugContainer.style.zIndex = '1000';

  // Mostrar el estado global
  const stateString = JSON.stringify(state, null, 2);
  const pre = document.createElement('pre');
  pre.textContent = stateString;
  debugContainer.appendChild(pre);

  // Añadir al DOM
  document.body.appendChild(debugContainer);

  // Actualizar cuando haya cambios en el store
  store.subscribe(() => {
    const updatedState = store.getState();
    pre.textContent = JSON.stringify(updatedState, null, 2);
  });
}
