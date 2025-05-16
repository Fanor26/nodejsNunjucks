import { fetcher } from '../api/fetcher.js';
import { debugLog } from '../debug.js'; // Make sure to import debugLog

export async function asyncLoadItems(entityType) {
  const requestId = `load-${entityType}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  try {
    debugLog(`[${requestId}] Starting to load ${entityType} items`);
    const url = `/api/getAll?type=${entityType}`;

    debugLog(`[${requestId}] Making request to: ${url}`);
    const result = await fetcher({
      url,
      method: 'GET',
      credentials: 'include',
    });

    debugLog(`[${requestId}] Received response`, {
      hasSuccessProperty: 'success' in result,
      hasDataProperty: 'data' in result,
      dataIsArray: Array.isArray(result.data),
      itemCount: Array.isArray(result.data) ? result.data.length : 'N/A',
    });

    if (!result.success) {
      debugLog(`[${requestId}] Request failed`, {
        error: result.error,
        fullResponse: result,
      });
      throw new Error(result.error || `Failed to load ${entityType} items`);
    }

    if (!Array.isArray(result.data)) {
      debugLog(`[${requestId}] Invalid data format`, {
        actualType: typeof result.data,
        dataSample: result.data,
      });
      throw new Error(`Expected array but got ${typeof result.data}`);
    }

    debugLog(
      `[${requestId}] Successfully loaded ${result.data.length} ${entityType} items`
    );
    return result.data;
  } catch (error) {
    debugLog(`[${requestId}] Error loading ${entityType} items`, {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
    console.error(`❌ [${requestId}] Error:`, error);
    throw error;
  }
}
