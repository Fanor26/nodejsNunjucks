import { renderItems } from '../../renders/renderItems.js';
import { resetSelection } from '../../utils/checkboks.js';
import { handleBulkDelete } from '../../utils/eventHandlers.js';

let panel;

export function createPanel() {
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');

  if (panel) return panel;

  panel = document.createElement('div');
  panel.id = 'panel';
  panel.style.position = 'fixed';
  panel.style.top = `${navbar.offsetHeight}px`;
  panel.style.right = '-60px';
  panel.style.height = `calc(100vh - ${
    navbar.offsetHeight + footer.offsetHeight
  }px)`;
  panel.style.width = '60px';
  panel.style.backgroundColor = '#130242';
  panel.style.color = 'white';
  panel.style.boxShadow = '2px 0 5px rgba(8, 2, 23, 0.5)';
  panel.style.transition = 'right 0.3s ease-in-out';
  panel.style.zIndex = '1000';
  panel.style.display = 'flex';
  panel.style.flexDirection = 'column';
  panel.style.alignItems = 'center';
  panel.style.paddingTop = '15px';

  // Contenedor del contador de seleccionados
  const selectedCountContainer = document.createElement('div');
  selectedCountContainer.id = 'selectedCountContainer';
  selectedCountContainer.textContent = ` 0`; // Inicializamos con 0
  selectedCountContainer.style.fontSize = '16px';
  selectedCountContainer.style.marginBottom = '15px';
  selectedCountContainer.style.color = '#ddd';
  panel.appendChild(selectedCountContainer);

  const icons = [
    {
      name: 'Destacar',
      svg: '⭐',
      action: () => console.log('Destacar clickeado'),
    },
    {
      name: 'Compartir',
      svg: '🔗',
      action: () => console.log('Compartir clickeado'),
    },
    {
      name: 'Descargar',
      svg: '📥',
      action: () => console.log('Descargar clickeado'),
    },
    {
      name: 'Eliminar',
      svg: '🗑️',
      action: () => {
        const selectedRows = document.querySelectorAll(
          '.selectable-row.selected'
        );
        if (selectedRows.length > 0) {
          const selectedItems = [];
          selectedRows.forEach((row) => {
            const itemId = row.getAttribute('data-id');
            const itemData = { _id: itemId }; // o agrega más datos según tu estructura
            selectedItems.push(itemData);
          });

          // Llamamos a la función de eliminación en masa pasando los ítems seleccionados
          handleBulkDelete(selectedItems);
        } else {
          console.log('No hay filas seleccionadas para eliminar.');
        }
      },
    },

    {
      name: 'Ajustes',
      svg: '⚙️',
      action: () => console.log('Ajustes clickeado'),
    },
    {
      name: 'Archivar',
      svg: '📂',
      action: () => console.log('Archivar clickeado'),
    },
  ];

  icons.forEach(({ name, svg, action }) => {
    const iconContainer = document.createElement('div');
    iconContainer.innerHTML = svg;
    iconContainer.title = name;
    iconContainer.style.fontSize = '24px';
    iconContainer.style.margin = '15px 0';
    iconContainer.style.cursor = 'pointer';
    iconContainer.style.transition = 'color 0.2s';
    iconContainer.style.color = '#ddd';

    iconContainer.addEventListener(
      'mouseenter',
      () => (iconContainer.style.color = '#fff')
    );
    iconContainer.addEventListener(
      'mouseleave',
      () => (iconContainer.style.color = '#ddd')
    );

    iconContainer.addEventListener('click', () => {
      action();
      console.log(`${name} clickeado`); // Acciones específicas según el icono
    });

    panel.appendChild(iconContainer);
  });

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '❌';
  closeButton.style.position = 'absolute';
  closeButton.style.bottom = '10px';
  closeButton.style.left = '50%';
  closeButton.style.transform = 'translateX(-50%)';
  closeButton.style.padding = '5px';
  closeButton.style.backgroundColor = 'white';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '16px';
  closeButton.addEventListener('click', closePanel);

  panel.appendChild(closeButton);
  document.body.appendChild(panel);

  return panel;
}

export function openPanel() {
  if (!panel) createPanel();
  panel.style.right = '0';
}

export function closePanel() {
  if (panel) panel.style.right = '-60px';
  resetSelection();
}
