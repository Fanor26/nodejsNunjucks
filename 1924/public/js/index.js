import { setupContent } from './components/common/content.js'
import { setupFooter } from './components/common/footer.js'
import { adjustContent } from './utils/ajust.js'
import { createFloatingPhone } from './redux/FloatingPhone.js'
import { renderClockWidget } from './components/widgets/clockWidget.js'
import { setupWebSocket } from './config/webSocket.js'
import { initSessionManagement } from './utils/sessionUtils.js'
import { createSidebarToggleButton } from './components/common/navigate/sideNav.js'
import { init } from './init.js'
import { initSpinner } from './components/common/spinner.js'
import { store } from './store/index.js'
import { renderTreeViewer } from './redux/treeViewer.js'
import { subscribeMenu } from './renders/menuRenderer.js'

export function initializeElementsOnLoad () {
  init()
  subscribeMenu()

  setupFooter()

  // setupWebSocket();

  // renderClockWidget();
  // createFloatingPhone('https://tu-url');

  // createSidebarToggleButton();
}

// window.addEventListener('resize', () => {
//   adjustContent();
// });
document.addEventListener('DOMContentLoaded', initializeElementsOnLoad)
