import { renderItems } from './renders/renderItems.js'
import { renderTreeViewer } from './redux/treeViewer.js'
import { store } from './store/index.js'

let unsubscribe = null

export function setupSubscriptions (route) {
  if (unsubscribe) unsubscribe()

  unsubscribe = store.subscribe(() => {
    const state = store.getState()
    document.querySelector('.tree-viewer')?.remove()
    renderTreeViewer(state)

    if (route.useItemsView) {
      renderItems(true)
    }
  })
}

export function cleanupSubscriptions () {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
}
