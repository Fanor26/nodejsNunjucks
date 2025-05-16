import { apiFetch } from '../api/apiFetch.js'
import { controllers } from '../controllers/index.js'
import { initializeEndpointData } from '../initActions.js'

import { store } from '../store/index.js'

import { executeScripts } from './storageUtils.js'

export async function loadRoutes () {
  try {
    const data = await apiFetch('/api/routes')

    // ✅ Solo actualiza el store si hay datos
    if (data.routes && data.routes.length > 0) {
      store.dispatch({
        type: 'SET_ROUTES',
        payload: data.routes // Guardamos las rutas en el store
      })
    }
    initializeEndpointData()

    return data.routes || []
  } catch (err) {
    console.error('❌ Error al cargar rutas:', err)
    return []
  }
}

export async function loadContent (route, addToHistory = true) {
  console.log('🔗 Cargando contenido desde:', route.path) // 👈 Añadido

  const contentContainer = document.getElementById('content')
  store.dispatch({ type: 'SHOW_SPINNER' })

  store.dispatch({
    type: 'SET_CURRENT_PATH',
    payload: route.path
  })
  localStorage.setItem('currentPath', route.path)

  try {
    const response = await fetch(route.path)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const text = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const newContent = doc.querySelector('#content')
    if (!newContent) throw new Error('❌ No se encontró #content')

    contentContainer.innerHTML = newContent.innerHTML

    // Animación
    contentContainer.classList.remove('zoom-in-back')
    void contentContainer.offsetWidth
    contentContainer.classList.add('zoom-in-back')

    // Título dinámico
    document.title = doc.querySelector('title')?.innerText || route.path

    if (addToHistory) {
      history.pushState({ url: route.path }, '', route.path)
    }
    initializeEndpointData()
    // Ejecut  initializeEndpointData()ar controlador si existe
    if (controllers[route.path]) {
      controllers[route.path]()
    }

    // Scroll a hash si hay
    const hashIndex = route.path.indexOf('#')
    if (hashIndex !== -1) {
      const hash = route.path.substring(hashIndex)
      scrollToHash(hash)
    }

    // // Ejecutar controlador si existe
  } catch (error) {
    contentContainer.innerHTML = `<p>Error al cargar <strong>${route.title}</strong>.</p>`
    console.error('Error al cargar contenido:', error)
  } finally {
    setTimeout(() => store.dispatch({ type: 'HIDE_SPINNER' }), 1000)
  }
}
