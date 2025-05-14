export async function fetcher ({
  url,
  method = 'GET',
  headers = {},
  body = null,
  token = null, // Token para autorización
  credentials = 'same-origin' // Por defecto para cookies o session, puedes cambiarlo a 'include' si es necesario
}) {
  try {
    // Preparamos los headers de autenticación si es necesario
    const authHeaders = token
      ? {
          Authorization: `Bearer ${token}`, // Para el caso de tokens
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      : { 'Content-Type': 'application/json', Accept: 'application/json' }

    // Realizamos la solicitud fetch con los headers configurados
    const response = await fetch(url, {
      method,
      headers: {
        ...authHeaders, // Incluir los headers de autenticación si tenemos token
        ...headers // Si se pasan más headers adicionales
      },
      body: body ? JSON.stringify(body) : null, // El cuerpo de la solicitud, si es necesario
      credentials // Esto es importante para manejar cookies o sesiones, predeterminado a 'same-origin'
    })

    // Manejo de errores en caso de una respuesta no exitosa
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    // Convertimos la respuesta en JSON
    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ Error en fetcher:', error)
    throw error
  }
}
