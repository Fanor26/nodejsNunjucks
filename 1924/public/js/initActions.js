import { setTypeEndpoint, setApiSubItem } from '/js/actions/dispatchActions.js'
import { debugLog } from '/js/debug.js'

export function initializeEndpointData (containerId = 'data-container') {
  const container = document.getElementById(containerId)

  if (!container) {
    debugLog(`❌ Contenedor con id '${containerId}' no encontrado`, 'warn')
    return
  }

  const rawData = container.dataset.action
  if (!rawData) {
    debugLog('⚠️ No se encontró el atributo data-action', 'warn')
    return
  }

  let actionData = {}
  try {
    actionData = JSON.parse(rawData)
  } catch (err) {
    debugLog(`❌ Error al parsear data-action: ${err.message}`, 'error')
    return
  }

  const { typeEndpoint, apiSubItem } = actionData
  debugLog(
    `[initActions] 📦 typeEndpoint: ${typeEndpoint}, apiSubItem: ${apiSubItem}`,
    'log'
  )

  if (typeEndpoint) {
    setTypeEndpoint(typeEndpoint)
    debugLog(
      `[initActions] ✅ setTypeEndpoint ejecutado con: ${typeEndpoint}`,
      'info'
    )
  }

  if (apiSubItem) {
    setApiSubItem(apiSubItem)
    debugLog(
      `[initActions] ✅ setApiSubItem ejecutado con: ${apiSubItem}`,
      'info'
    )
  }
}
