import { loadContent } from '../../../utils/configUtils.js'
import { toggleSidebar } from './utils/index.js'
import { createDynamicTreeMenu } from '../../dynamic/treeMenu.js'
import { store } from '../../../store/index.js'
import { handleRouteChange } from './utils/handleRouteChange.js'

export function renderNavbar (routes) {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  navbar.innerHTML = ''

  const leftContainer = document.createElement('div')
  leftContainer.className = 'navbar-left'

  const menuBtn = document.createElement('button')
  menuBtn.className = 'menu-toggle'
  menuBtn.innerHTML = '&#9776;'
  menuBtn.addEventListener('click', toggleSidebar)
  leftContainer.appendChild(menuBtn)

  const currentPath =
    store.getState().router?.currentPath || localStorage.getItem('currentPath')

  const menuTree = createDynamicTreeMenu(routes, {
    keyField: 'path',
    labelField: 'title',
    childrenField: 'subroutes',
    currentValue: currentPath,
    baseClass: 'navbar',

    onItemAction: async route => {
      await handleRouteChange(route)
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path })
      localStorage.setItem('currentPath', route.path)

      renderNavbar(routes) // Re-render
      if (window.innerWidth <= 768) toggleSidebar()
    }
  })

  navbar.appendChild(leftContainer)
  navbar.appendChild(menuTree)
}
