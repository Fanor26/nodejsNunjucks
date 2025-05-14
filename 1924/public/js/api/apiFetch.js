export async function apiFetch (url, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Incluye cookies o tokens de sesión
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      // Extraer mensaje más detallado si viene como JSON
      let errorMsg = `Error ${response.status}`
      try {
        const errorData = await response.json()
        if (errorData.message) errorMsg = errorData.message
      } catch (_) {
        errorMsg = `${errorMsg}: ${response.statusText}`
      }

      throw new Error(errorMsg)
    }

    return await response.json() // Solo aceptamos JSON
  } catch (error) {
    console.error('❌ Error en apiFetch:', error.message)
    throw error
  }
}
