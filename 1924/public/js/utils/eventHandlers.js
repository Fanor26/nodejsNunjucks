import {
  updateItem,
  deleteItem,
  deleteSubItem,
} from '../actions/dispatchActions.js';
import {
  deleteItemFromAPI,
  deleteItemsFromAPI,
  deleteSubItemFromAPI,
  loadItemsFromAPI,
} from '../api/itemsApi.js';
import { showConfirmationModal } from './modalHelpers.js';
import { toggleModal } from '../components/custom/modal/index.js';

import { store } from '../store/index.js';

import { closePanel } from '../components/common/panel.js';
import { updateSelectedCount } from './checkboks.js';
import { renderItems } from '../renders/renderItems.js';

// 🛠️ Función para actualizar un ítem
export function handleUpdate(itemId) {
  showConfirmationModal('Editar', 'Editar nombre:', () => {
    const newName = document.getElementById('new-name').value;
    if (newName) {
      updateItem(itemId, { name: newName });
      toggleModal(false);
    }
  }),
    '';
}

// 🛠️ Función para eliminar un ítem
async function confirmAndDelete(itemId, typeEndpoint) {
  const success = await deleteItemFromAPI(itemId, typeEndpoint);
  if (success) {
    // Eliminar la fila correspondiente en el DOM
    const row = document.querySelector(`[data-id="${itemId}"]`);
    if (row) row.remove();

    // Actualizar el estado local o del store
    deleteItem(itemId);
  }
}

export function handleDelete(itemId, typeEndpoint) {
  showConfirmationModal(
    'Eliminar',
    '¿Seguro que quieres eliminar este ítem?',
    () => {
      confirmAndDelete(itemId, typeEndpoint);
    },
    'small'
  );
}

export async function handleBulkDelete(selectedItems) {
  const { typeEndpoint } = store.getState().pageData;
  console.log(typeEndpoint);
  const type = typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1);
  const idsToDelete = selectedItems.map((item) => item._id);
  console.log('🗑️ IDs a eliminar:', idsToDelete);

  if (idsToDelete.length === 0) {
    console.warn('⚠️ No hay ítems seleccionados para eliminar.');
    return;
  }

  showConfirmationModal(
    'Eliminar múltiples ítems',
    '¿Seguro que quieres eliminar estos ítems?',
    async () => {
      try {
        const success = await deleteItemsFromAPI(type, idsToDelete);

        if (success) {
          // Eliminar visualmente del DOM
          selectedItems.forEach((item) => {
            const row = document.querySelector(`[data-id="${item._id}"]`);
            if (row) row.remove();
          });
          updateSelectedCount();
          toggleModal(false);
          closePanel();
        }
      } catch (error) {
        console.error('❌ Error al eliminar ítems:', error);
      }
    },
    'small'
  );
}
// 🛠️ Función para eliminar un subítem (ej. eliminar un permiso dentro de un rol)
export async function handleDeleteSubItem(
  itemId,
  subItemId,
  typeEndpoint,
  subItemField
) {
  // Mostrar un modal de confirmación antes de eliminar
  showConfirmationModal(
    'Eliminar Subítem',
    '¿Seguro que quieres eliminar este subítem?',
    async () => {
      try {
        // Llamamos a la API para eliminar el subítem
        const success = await deleteSubItemFromAPI(
          itemId,
          subItemId,
          typeEndpoint,
          subItemField
        );

        if (success) {
          // Eliminar visualmente el subítem en la UI (por ejemplo, eliminando el permiso de un rol)
          toggleModal(false);
          const endpoint =
            typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1);
          await loadItemsFromAPI(endpoint); // Actualiza el store internamente

          // 🔁 Forzar render manual
          renderItems(true);
          deleteSubItem(itemId, subItemId, subItemField);
          // Opcionalmente, podrías cerrar el modal o realizar alguna acción adicional
        }
      } catch (error) {
        console.error('❌ Error al eliminar el subítem:', error);
      }
    },
    'small'
  );
}
