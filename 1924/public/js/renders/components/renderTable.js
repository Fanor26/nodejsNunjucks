import { createModal } from '../../components/custom/modal/index.js';
import { filterKeys } from '../../utils/filter.js';
import {
  toggleRowSelection,
  setupSelectAllHandler,
} from '../../utils/checkboks.js'; // Importamos las funciones
import {
  handleDelete,
  handleDeleteSubItem,
  handleUpdate,
} from '../../utils/eventHandlers.js';
import { store } from '../../store/index.js';

export function renderTable(
  items,
  container,
  allowedKeys = [],
  isSelecting = false
) {
  const table = generateTableFromData(items, true, allowedKeys, isSelecting);
  container.appendChild(table);
  setupSelectAllHandler();
}
function generateTableFromData(
  data,
  isMainTable = true,
  allowedKeys = [],
  isSelecting = false,
  parentId = null
) {
  if (!Array.isArray(data) || data.length === 0) {
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = 'Aún no hay datos disponibles.';
    return noDataMessage;
  }

  const excludedKeys = ['__v', '_id', 'createdAt', 'updatedAt'];
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  if (isSelecting) {
    const thCheckbox = document.createElement('th');
    thCheckbox.innerHTML = '<input type="checkbox" id="selectAllCheckbox" />';
    headerRow.appendChild(thCheckbox);
  }

  const thNumero = document.createElement('th');
  thNumero.textContent = 'N°';
  headerRow.appendChild(thNumero);

  const headers = Object.keys(data[0]).filter(
    (key) =>
      !excludedKeys.includes(key) &&
      (allowedKeys.length === 0 || allowedKeys.includes(key))
  );

  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    headerRow.appendChild(th);
  });

  if (!isMainTable) {
    const thActions = document.createElement('th');
    thActions.textContent = 'Acciones';
    headerRow.appendChild(thActions);
  }

  thead.appendChild(headerRow);
  const tbody = document.createElement('tbody');

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.classList.add('selectable-row');
    row.setAttribute('data-id', item._id);
    if (parentId) {
      row.setAttribute('data-parent-id', parentId);
    }

    if (isSelecting) {
      const tdCheckbox = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('row-checkbox');
      checkbox.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleRowSelection(row);
      });
      tdCheckbox.appendChild(checkbox);
      row.appendChild(tdCheckbox);
    }

    const tdNumero = document.createElement('td');
    tdNumero.textContent = index + 1;
    row.appendChild(tdNumero);

    headers.forEach((header) => {
      const td = document.createElement('td');

      // Si es un array
      if (Array.isArray(item[header])) {
        const count = item[header].length;

        if (count > 0) {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = `${count}`;
          link.style.textDecoration = 'none';
          link.style.color = 'yellow';
          link.style.padding = '4px 8px';
          link.style.borderRadius = '5px';
          link.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
          link.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
          link.addEventListener('click', (event) => {
            event.stopPropagation();

            // Solo generamos subtabla si hay elementos
            const content = generateTableFromData(
              item[header],
              false,
              allowedKeys,
              isSelecting,
              item._id
            );
            createModal(`Detalles de ${header}`, content, '', 'fullscreen');
          });
          td.appendChild(link);
        } else {
          // Si no hay elementos, mostrar un texto de 0
          const plainText = document.createElement('span');
          plainText.textContent = '0';
          plainText.style.opacity = '0.6';
          td.appendChild(plainText);
        }
      }
      // Si es un objeto
      else if (typeof item[header] === 'object' && item[header] !== null) {
        // Verificar si el objeto tiene elementos
        const subItemKeys = Object.keys(item[header]);
        if (subItemKeys.length > 0) {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = `Ver detalles`;
          link.addEventListener('click', (event) => {
            event.stopPropagation();
            const subTable = generateTableFromData(
              [filterKeys(item[header], excludedKeys, allowedKeys)],
              false,
              allowedKeys,
              isSelecting,
              item._id // Pasamos el ID del padre
            );
            createModal(`Detalles de ${header}`, [subTable], '', 'fullscreen');
          });
          td.appendChild(link);
        } else {
          // Si no hay sub-elementos, solo mostramos un mensaje o vacío
          const plainText = document.createElement('span');
          plainText.textContent = 'Sin detalles';
          plainText.style.opacity = '0.6';
          td.appendChild(plainText);
        }
      }
      // Si es cualquier otro tipo de valor (string, número, etc)
      else {
        td.textContent = item[header] || '';
      }

      row.appendChild(td);
    });

    // Si es una tabla secundaria, agregar botones de acción
    if (!isMainTable) {
      const { typeEndpoint, apiSubItem } = store.getState().pageData;
      const type = typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1);
      const tdActions = document.createElement('td');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();

        const parentId = row.getAttribute('data-parent-id');
        if (!parentId) {
          console.error('❌ No se encontró el ID del padre');
          return;
        }

        handleDeleteSubItem(parentId, item._id, type, apiSubItem);
      });

      tdActions.appendChild(deleteBtn);
      row.appendChild(tdActions);
    }

    // Click en la fila para ver detalles
    row.addEventListener('click', (event) => {
      if (!event.target.closest('input[type="checkbox"], a')) {
        const rowDetails = generateRowDetails(item, isMainTable);
        createModal('Detalles de la fila', rowDetails, '', 'fullscreen');
      }
    });

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  return tableContainer;
}

// Función de eliminación

// Función para generar detalles de la fila seleccionada (incluyendo los botones de acción)
function generateRowDetails(item, isMainTable) {
  const detailsContainer = document.createElement('div');
  const { typeEndpoint } = store.getState().pageData;

  const type = typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1);
  // Agregar los detalles de la fila
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      const detail = document.createElement('p');
      detail.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
        item[key]
      }`;
      detailsContainer.appendChild(detail);
    }
  }

  // Solo agregar los botones si estamos en el primer nivel de la tabla (isMainTable === true)
  if (isMainTable) {
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('actions-container');

    // Crear el botón "Activar"
    const activateBtn = document.createElement('button');
    activateBtn.classList.add('activate-btn');
    activateBtn.textContent = '⚡';

    // Crear el botón "Desactivar"
    const deactivateBtn = document.createElement('button');
    deactivateBtn.classList.add('deactivate-btn');
    deactivateBtn.textContent = '⛔';

    // Crear el botón "Actualizar"
    const updateBtn = document.createElement('button');
    updateBtn.classList.add('update-btn');
    updateBtn.textContent = '✏️';

    // Crear el botón "Eliminar"
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '🗑️';

    // Asignar eventos de clic a los botones
    activateBtn.addEventListener('click', () => {
      console.log('Activar ID:', item._id); // Llamar a la función de activar
      activateItem(item._id); // Llamar a la función correspondiente para activar el ítem
    });

    deactivateBtn.addEventListener('click', () => {
      console.log('Desactivar ID:', item._id); // Llamar a la función de desactivar
      deactivateItem(item._id); // Llamar a la función correspondiente para desactivar el ítem
    });

    updateBtn.addEventListener('click', () => {
      console.log('Actualizar ID:', item._id); // Llamar a la función de actualizar
      handleUpdate(item._id); // Llamar a la función correspondiente para actualizar el ítem
    });

    deleteBtn.addEventListener('click', async () => {
      console.log('Eliminar ID:', item);
      handleDelete(item._id, type); // Llamar a la función de eliminación si existe
    });

    // Agregar los botones al contenedor de acciones
    actionsContainer.appendChild(activateBtn);
    actionsContainer.appendChild(deactivateBtn);
    actionsContainer.appendChild(updateBtn);
    actionsContainer.appendChild(deleteBtn);

    // Agregar el contenedor de acciones al contenedor de detalles
    detailsContainer.appendChild(actionsContainer);
  }

  // Retornar los detalles (incluyendo o no los botones según el nivel)
  return detailsContainer;
}
