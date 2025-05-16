import { store } from '../store/index.js';
import { apiFetch } from './apiFetch.js';

export async function deleteItemFromAPI(itemId, typeEndpoint) {
  try {
    const response = await apiFetch(
      `/api/${itemId}?type=${typeEndpoint}`,
      'DELETE'
    );
    console.log('fetch', response);
    if (response?.success) {
      console.log(`Ítem ${itemId} eliminado.`);

      return true;
    } else {
      throw new Error('No se pudo eliminar el ítem.');
    }
  } catch (error) {
    console.error('Error al eliminar:', error);
    return false;
  }
}

export async function loadItemsFromAPI(typeEndpoint) {
  try {
    const url = `/api/getAll?type=${typeEndpoint}`;
    const result = await apiFetch(url);

    console.log('fetch', result);

    if (!result.success || !result.data) {
      console.error('No se pudieron cargar los ítems');
      return;
    }

    // ✅ Solo actualiza el store si hay datos,
    store.dispatch({
      type: 'SET_ITEMS',
      payload: result.data,
    });
  } catch (error) {
    console.error('Error al cargar los ítems:', error);
  }
}
export async function checkIfItemExists(typeEndpoint, itemId) {
  try {
    const response = await apiFetch(`/api/${typeEndpoint}/${itemId}`);
    if (!response.ok) {
      throw new Error('El ítem no existe o ha sido eliminado.');
    }
    const data = await response.json();
    store.dispatch({
      type: 'SET_ITEMS',
      payload: data,
    });

    console.log(data);
    return data ? true : false; // Si la respuesta contiene datos, el ítem existe
  } catch (error) {
    console.error(error);
    return false; // Si hubo un error (como un 404), consideramos que no existe
  }
}

export async function deleteItemsFromAPI(typeEndpoint, itemIds) {
  console.log('Deleting items from API', typeEndpoint); // Corregido aquí
  console.log('itemsIds', itemIds);

  try {
    const response = await apiFetch(
      `/api/delete-bulk?type=${typeEndpoint}`,
      'POST',
      { ids: itemIds } // Pasar el array de IDs en el cuerpo de la solicitud
    );
    console.log('response', response);

    if (response?.success) {
      console.log(`Ítems ${itemIds.join(', ')} eliminados.`);

      // Actualizar el estado de los ítems restantes en el store
      const { items } = store.getState().pageData;
      const remainingItems = items.filter(
        (item) => !itemIds.includes(item._id)
      );

      // Despachar la acción para actualizar los ítems en el estado
      store.dispatch({
        type: 'SET_ITEMS',
        payload: remainingItems,
      });

      return true;
    } else {
      throw new Error('No se pudieron eliminar los ítems.');
    }
  } catch (error) {
    console.error('Error al eliminar los ítems:', error);
    return false;
  }
}

export async function deleteSubItemFromAPI(
  itemId,
  subItemId,
  typeEndpoint,
  subItemField
) {
  try {
    const url = `/api/${itemId}/${subItemId}?type=${typeEndpoint}&field=${subItemField}`;
    console.log('url', url);
    const response = await apiFetch(url, 'DELETE');

    if (!response?.success) {
      throw new Error('No se pudo eliminar el subítem.');
    }

    console.log(`✅ Subítem ${subItemId} eliminado de ${subItemField}.`);
    return true;
  } catch (error) {
    console.error('❌ Error al eliminar el subítem desde la API:', error);
    return false;
  }
}
