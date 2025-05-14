import { store } from '../../../store/index.js'
import { handleRouteChange } from './utils/handleRouteChange.js'

import { toggleSidebar } from './utils/index.js'
import { createDynamicTreeMenu } from '../../dynamic/treeMenu.js'
import { loadContent } from '../../../utils/configUtils.js'

export function renderSidebar (routes) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return

  sidebar.innerHTML = ''

  const { currentPath } =
    store.getState().router || localStorage.getItem('currentPath')

  // 🔹 Toolbar
  const toolbar = document.createElement('div')
  toolbar.className = 'sidebar-toolbar'
  toolbar.textContent = 'Menú'

  const nav = document.createElement('nav')
  nav.className = 'sidebar-content'

  const footer = document.createElement('div')
  footer.className = 'sidebar-footer'
  footer.textContent = '© 2025 Tu App'

  const menuTree = createDynamicTreeMenu(routes, {
    keyField: 'path',
    labelField: 'title',
    childrenField: 'subroutes',
    currentValue: currentPath,
    baseClass: 'sidebar',
    showArrows: true,
    onItemAction: async route => {
      await loadContent(route)
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path })
      localStorage.setItem('currentPath', route.path)
      renderSidebar(routes) // Re-render
      if (window.innerWidth <= 768) toggleSidebar()
    }
  })

  nav.appendChild(menuTree)
  sidebar.appendChild(toolbar)
  sidebar.appendChild(nav)
  sidebar.appendChild(footer)
}
