import { loadItemsFromAPI } from '../../../../api/itemsApi.js'
import { renderItems } from '../../../../renders/renderItems.js'
import { store } from '../../../../store/index.js'
import { loadContent } from '../../../../utils/configUtils.js'

function waitUntil (predicate, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const interval = 50
    let waited = 0

    const check = () => {
      if (predicate()) return resolve()
      waited += interval
      if (waited >= timeout) reject(new Error('Timeout waiting for condition'))
      else setTimeout(check, interval)
    }

    check()
  })
}
export async function handleRouteChange (route) {
  console.log('ruta actual después de presionar clic', route.path)
  store.dispatch({ type: 'RESET_PAGE_DATA' })

  await loadContent(route)

  try {
    // Esperar hasta que pageData.typeEndpoint esté disponible
    await waitUntil(() => store.getState().pageData?.typeEndpoint)

    const { typeEndpoint } = store.getState().pageData
    const endpoint =
      typeEndpoint.charAt(0).toUpperCase() + typeEndpoint.slice(1)
    console.log('enpoint al presionar', endpoint)

    await loadItemsFromAPI(endpoint)
    await renderItems(true)
  } catch (err) {
    console.warn('⚠️ No se encontró typeEndpoint después de esperar.')
  }
}
