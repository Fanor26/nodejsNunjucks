// components/common/panel.js

// Abre el panel lateral
export function openPanelRedux() {
  const panel = document.getElementById('side-panel');
  if (panel) {
    panel.style.width = '300px'; // Ancho del panel lateral
    panel.style.transition = '0.5s';
  }
}

// Crea el panel lateral
export function createPanelRedux(apiEndpoint) {
  const panel = document.createElement('div');
  panel.id = 'side-panel';
  panel.style.position = 'fixed';
  panel.style.top = '0';
  panel.style.right = '-300px'; // Panel oculto inicialmente
  panel.style.width = '300px';
  panel.style.height = '100vh';
  panel.style.backgroundColor = '#fff';
  panel.style.borderLeft = '1px solid #ddd';
  panel.style.overflowY = 'auto';
  panel.style.padding = '20px';
  panel.style.boxShadow = '-2px 0 5px rgba(0, 0, 0, 0.2)';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cerrar Panel';
  closeButton.style.backgroundColor = '#f44336';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    closePanel();
  });

  const panelHeader = document.createElement('div');
  panelHeader.style.marginBottom = '20px';
  panelHeader.appendChild(closeButton);

  const panelContent = document.createElement('div');
  panelContent.id = 'panel-content';

  panel.appendChild(panelHeader);
  panel.appendChild(panelContent);

  // Agregar el panel al body
  document.body.appendChild(panel);
}

// Cierra el panel lateral
export function closePanelRedux() {
  const panel = document.getElementById('side-panel');
  if (panel) {
    panel.style.width = '0'; // Ocultar el panel
  }
}

// Función para actualizar el contenido del panel
export function updatePanelContent(state, actionHistory) {
  const panelContent = document.getElementById('panel-content');

  // Limpiar contenido previo
  panelContent.innerHTML = '';

  // Mostrar estado
  const stateTitle = document.createElement('h3');
  stateTitle.textContent = 'Estado del Store';
  panelContent.appendChild(stateTitle);

  const stateDisplay = document.createElement('pre');
  stateDisplay.textContent = JSON.stringify(state, null, 2);
  stateDisplay.style.fontFamily = 'monospace';
  stateDisplay.style.whiteSpace = 'pre-wrap';
  panelContent.appendChild(stateDisplay);

  // Mostrar historial de acciones
  const actionsTitle = document.createElement('h3');
  actionsTitle.textContent = 'Historial de Acciones';
  panelContent.appendChild(actionsTitle);

  const actionList = document.createElement('ul');
  actionHistory.forEach((action, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Acción ${index + 1}: ${JSON.stringify(action)}`;
    listItem.addEventListener('click', () => {
      alert(`Detalles de la acción: ${JSON.stringify(action, null, 2)}`);
    });
    actionList.appendChild(listItem);
  });

  panelContent.appendChild(actionList);
}
