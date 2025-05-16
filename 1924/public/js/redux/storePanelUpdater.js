export function updateStorePanel(store) {
  const state = store.getState();
  const actionHistory = store.getActionHistory();
  const storeNodes = store.getStoreNodesInApp(); // Obtener los nodos usando la función ya modularizada

  // Verifica si realmente estamos obteniendo los nodos
  console.log('Estado en Panel:', state);
  console.log('Nodos del Store:', storeNodes);

  // Mostrar el estado actual del store
  const stateDisplay = document.getElementById('state-display');
  if (stateDisplay) {
    stateDisplay.textContent = JSON.stringify(state, null, 2);
  }

  // Mostrar el historial de acciones
  const actionHistoryList = document.getElementById('action-history-list');
  if (actionHistoryList) {
    actionHistoryList.innerHTML = '';
    actionHistory.forEach((action, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Acción ${index + 1}: ${JSON.stringify(action)}`;
      actionHistoryList.appendChild(listItem);
    });
  }

  // Mostrar los nodos del store
  const nodesDisplay = document.getElementById('nodes-display');
  if (nodesDisplay) {
    nodesDisplay.textContent = storeNodes;
  }
}
