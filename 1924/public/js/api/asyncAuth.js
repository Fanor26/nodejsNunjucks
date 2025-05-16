import { loginFailure, loginSuccess } from '../actions/authActions.js'
import { logoutDispatch } from '../actions/dispatchActions.js'
import { store } from '../store/index.js'

import { loadRoutes, loadContent } from '../utils/configUtils.js'
import { renderNavbar } from '../components/common/navigate/index.js'
import { renderSidebar } from '../components/common/navigate/sidebar.js'
import { apiFetch } from './apiFetch.js'
import { subscribeMenu } from '../renders/menuRenderer.js'
import { handleRouteChange } from '../components/common/navigate/utils/handleRouteChange.js'

/**
 * 🔁 Función común para renderizar la UI según rutas filtradas y ruta inicial
 */
/**
 * ✅ Autenticación de usuario
 */
export const asyncAuth = async values => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    const data = await response.json()

    if (response.ok) {
      const userRoles = data.user.roles || []

      // Guardar en localStorage y Store
      localStorage.setItem('userRoles', JSON.stringify(userRoles))
      localStorage.setItem(
        'isAuthenticated',
        JSON.stringify(data.isAuthenticated)
      )
      store.dispatch(loginSuccess(data.user, data.isAuthenticated, userRoles))

      const allRoutes = await loadRoutes()

      // ✅ Filtrar rutas por roles
      const filteredRoutes = allRoutes.filter(route => {
        return (
          !route.roles || route.roles.some(role => userRoles.includes(role))
        )
      })

      // ✅ Actualizar store con rutas nuevas
      store.dispatch({ type: 'SET_ROUTES', payload: filteredRoutes })

      // ✅ Renderizar sidebar actualizado
      subscribeMenu(filteredRoutes)

      // ✅ Redirigir a la ruta inicial (ej: dashboard)
      const initialRoute =
        filteredRoutes.find(r => r.path === '/dashboard') || filteredRoutes[0]

      // ✅ Cargar contenido
      await handleRouteChange(initialRoute)

      return { success: true }
    } else {
      store.dispatch(loginFailure(data.error))
      return { success: false, error: data.error }
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    store.dispatch(loginFailure('Error de conexión'))
    return { success: false, error: 'Error de conexión' }
  }
}

/**
 * ❌ Logout del sistema
 */
export async function logoutFromAPI () {
  try {
    const response = await apiFetch('/api/logout', 'POST')

    if (response?.success) {
      logoutDispatch()

      // Limpiar localStorage
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRoles')
      localStorage.removeItem('userProfile')

      localStorage.removeItem('items')

      const allRoutes = await loadRoutes()
      const publicRoutes = allRoutes.filter(route => !route.roles)

      subscribeMenu(publicRoutes)
      const loginRoute = allRoutes.find(r => r.path === '/login') || {
        path: '/login',
        title: 'Login'
      }
      // Carga login sin recargar todo el sitio
      await handleRouteChange(loginRoute)
    } else {
      throw new Error(response?.error || 'No se pudo salir de la sesión.')
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    return false
  }
}
