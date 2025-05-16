import { loadContent } from '../utils/configUtils.js'
import { createDynamicTreeMenu } from '../components/dynamic/treeMenu.js'
import { store } from '../store/index.js'
import { toggleSidebar } from '../components/common/navigate/utils/index.js'
import { handleRouteChange } from '../components/common/navigate/utils/handleRouteChange.js'

export function renderNavbar (routes) {
  const navbar = document.getElementById('navbar')
  navbar.innerHTML = ''

  const leftContainer = document.createElement('div')
  leftContainer.className = 'navbar-left'

  const menuBtn = document.createElement('button')
  menuBtn.className = 'menu-toggle'
  menuBtn.innerHTML = '&#9776;'
  menuBtn.addEventListener('click', () => toggleSidebar('sidebar'))
  leftContainer.appendChild(menuBtn)

  const currentPath =
    store.getState().router?.currentPath || localStorage.getItem('currentPath')

  const menuTree = createDynamicTreeMenu(routes, {
    keyField: 'path',
    labelField: 'title',
    childrenField: 'subroutes',
    currentValue: currentPath,
    baseClass: 'navbar',
    onItemAction: route => {
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path })
      localStorage.setItem('currentPath', route.path)
      renderNavbar(routes)
      handleRouteChange(route)
    }
  })

  navbar.appendChild(leftContainer)
  navbar.appendChild(menuTree)
}

export function renderSidebar (routes) {
  const sidebar = document.getElementById('sidebar')
  sidebar.innerHTML = ''

  const toolbar = document.createElement('div')
  toolbar.className = 'sidebar-toolbar'
  toolbar.textContent = 'Menú'

  const nav = document.createElement('nav')
  nav.className = 'sidebar-content'

  const footer = document.createElement('div')
  footer.className = 'sidebar-footer'
  footer.textContent = '© 2025 Tu App'

  const currentPath =
    store.getState().router?.currentPath || localStorage.getItem('currentPath')

  const menuTree = createDynamicTreeMenu(routes, {
    keyField: 'path',
    labelField: 'title',
    childrenField: 'subroutes',
    currentValue: currentPath,
    baseClass: 'sidebar',
    showArrows: true,
    onItemAction: route => {
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path })
      localStorage.setItem('currentPath', route.path)
      renderSidebar(routes) // vuelve a renderizar para actualizar clases activas
      handleRouteChange(route)
    }
  })

  nav.appendChild(menuTree)
  sidebar.appendChild(toolbar)
  sidebar.appendChild(nav)
  sidebar.appendChild(footer)
}
let previousRoutes = []
let previousRoute = ''
export function subscribeMenu () {
  store.subscribe(() => {
    const { routes, currentPath } = store.getState().router

    const hasRoutesChanged =
      JSON.stringify(routes) !== JSON.stringify(previousRoutes)
    const hasRouteChanged = currentPath !== previousRoute

    if (hasRoutesChanged || hasRouteChanged) {
      previousRoutes = routes
      previousRoute = currentPath

      localStorage.setItem('currentPath', currentPath)
      console.log('📌 Routes o currentPath cambiaron', currentPath, routes)
      renderNavbar(routes)
      renderSidebar(routes)
    }
  })
}
