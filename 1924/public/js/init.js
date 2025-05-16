import { loadContent, loadRoutes } from './utils/configUtils.js'
import { store } from './store/index.js'

import { handleRouteChange } from './components/common/navigate/utils/handleRouteChange.js'

import { renderTreeViewer, safeUpdateTreeViewer } from './redux/treeViewer.js'
import { createDebugUI, debugLog } from './debug.js'
import { initializeEndpointData } from './initActions.js'

export async function init () {
  createDebugUI()

  try {
    await loadRoutes()

    debugLog('✅ Rutas cargadas correctamente', 'info')

    const { routes } = store.getState().router
    const savedPath = window.location.pathname
    const currentPath =
      routes.find(route => route.path === savedPath) || routes[0]

    debugLog(`📍 Rutaasdsadasd actual: ${JSON.stringify(currentPath)}`, 'log')

    if (currentPath) {
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: currentPath.path })
      await handleRouteChange(currentPath)

      debugLog(`🔁 Cambio de ruta manejado: ${currentPath.path}`, 'info')
    } else {
      debugLog('⚠️ Ruta guardada no encontrada en las rutas.', 'warn')
    }

    renderTreeViewer(store.getState())
    debugLog('🌲 TreeViewer renderizado con estado inicial', 'info')

    store.subscribe(() => {
      const state = store.getState()
      safeUpdateTreeViewer(state)
    })
  } catch (err) {
    debugLog(`❌ Error en init(): ${err.message}`, 'error')
    console.error('❌ Error en init():', err)
  }
}
