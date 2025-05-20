import { debugLog } from '../debug.js';

export async function fetcher({
  url,
  method = 'GET',
  headers = {},
  body = null,
  token = null,
  credentials = 'same-origin',
}) {
  const requestId = Math.random().toString(36).substring(2, 9);

  try {
    debugLog(`[${requestId}] Starting fetch to ${url}`, {
      method,
      headers: token ? 'with auth' : 'no auth',
      hasBody: !!body,
      credentials,
    });

    const authHeaders = token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };

    const fetchOptions = {
      method,
      headers: { ...authHeaders, ...headers },
      body: body ? JSON.stringify(body) : null,
      credentials,
    };

    debugLog(`[${requestId}] Fetch options:`, fetchOptions);

    const response = await fetch(url, fetchOptions);
    debugLog(`[${requestId}] Received response, status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      debugLog(`[${requestId}] Error response:`, {
        status: response.status,
        errorText,
      });
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    debugLog(`[${requestId}] Successful response data:`, {
      dataType: Array.isArray(data) ? 'array' : typeof data,
      dataKeys: Object.keys(data),
      itemCount: Array.isArray(data)
        ? data.length
        : data.data && Array.isArray(data.data)
        ? data.data.length
        : 'N/A',
    });

    return data;
  } catch (error) {
    debugLog(`[${requestId}] Fetch error:`, {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
    console.error(`❌ [${requestId}] Fetch error:`, error);
    throw error;
  }
}
