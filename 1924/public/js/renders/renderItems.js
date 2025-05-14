import { createHeader } from '../components/common/header.js'
import { store } from '../store/index.js'
import { itemsViewButtons } from '../utils/buttonsConfig.js'
import { renderTable } from './components/renderTable.js'
import { renderCards } from './components/renderCards.js'
import { createButtonGroup } from '../components/common/buttonGroup.js'
import { debugLog } from '../debug.js'
import { initializeEndpointData } from '../initActions.js'

export function renderItems (isTableView, isSelecting = false) {
  const { items } = store.getState().pageData || localStorage.getItem('items')
  debugLog(`[renderItems] 🎯 Estado recibido: ${JSON.stringify(items)}`, 'log')

  const container = document.getElementById('data-container')
  if (!container) {
    debugLog(
      '[renderItems] ❌ No se encontró el contenedor #data-container',
      'warn'
    )
    return
  }

  container.innerHTML = '' // limpiar contenedor
  debugLog('[renderItems] ♻️ Contenedor limpiado', 'info')

  const buttonGroup = createButtonGroup(
    itemsViewButtons(isTableView, isSelecting)
  )

  const icon = document.createElement('span')
  icon.textContent = '⚙️'

  const header = createHeader({
    titleText: '📋 Lista de Ítems',
    rightContent: buttonGroup,
    iconRight: icon
  })

  container.appendChild(header)
  debugLog('[renderItems] 🧱 Header agregado al contenedor', 'info')

  if (!items || items.length === 0) {
    debugLog('[renderItems] ⚠️ Lista de ítems vacía', 'warn')
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = '⚠️ No hay ítems para mostrar.'
    emptyMessage.style.textAlign = 'center'
    emptyMessage.style.marginTop = '20px'
    container.appendChild(emptyMessage)
    return
  }

  debugLog(
    `[renderItems] 📊 Renderizando como ${isTableView ? 'tabla' : 'tarjetas'}`,
    'info'
  )

  // Renderizar tabla o tarjetas
  isTableView
    ? renderTable(items, container, [], isSelecting)
    : renderCards(items, container)
}
