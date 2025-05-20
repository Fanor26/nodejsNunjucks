// asyncLoadItems.js
import { fetcher } from '../api/fetcher.js';
import { debugLog } from '../debug.js';

export async function asyncLoadItems(entityType) {
  try {
    debugLog(`[asyncLoadItems] Iniciando carga para ${entityType}`);

    const response = await fetcher({
      url: `/api/getAll?type=${entityType}`,
      method: 'GET',
      credentials: 'include',
    });

    debugLog('[asyncLoadItems] Respuesta recibida:', response);

    if (!response || typeof response !== 'object') {
      throw new Error('Respuesta inválida del servidor');
    }

    const items = Array.isArray(response.data) ? response.data : [];

    if (items.length === 0) {
      debugLog(`[asyncLoadItems] No hay datos para ${entityType}`);
      return { success: false, message: 'No hay datos disponibles' };
    }

    return {
      success: true,
      data: items,
      firstItem: items[0], // Para generación de columnas
    };
  } catch (error) {
    debugLog(`[asyncLoadItems] Error cargando ${entityType}:`, error);
    throw error; // Relanzamos el error para manejo en el componente
  }
}
