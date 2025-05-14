import { store } from '../../../store/index.js';
import { loadContent } from '../../../utils/configUtils.js';

import { createIcon } from '../icon.js';
export function createSidebarToggleButton() {
  const button = document.createElement('button');
  button.textContent = '☰'; // ícono hamburguesa
  button.style.position = 'fixed';
  button.style.bottom = '80px';
  button.style.right = '20px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#4a148c';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.fontSize = '24px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1100';

  button.addEventListener('click', () => {
    store.dispatch({ type: 'TOGGLE_SIDEBAR' });
  });

  document.body.appendChild(button);
}
export function createSideNav(routes) {
  const sideNav = document.createElement('div');
  sideNav.id = 'sideNav';
  sideNav.style.position = 'fixed';
  sideNav.style.top = '0';
  sideNav.style.right = '0';
  sideNav.style.width = '50px';
  sideNav.style.height = '100vh';
  sideNav.style.backgroundColor = '#130242';
  sideNav.style.transition = 'transform 0.3s ease';
  sideNav.style.zIndex = '1000';
  sideNav.style.display = 'flex';
  sideNav.style.transform = 'translateX(100%)'; // Oculto por defecto

  const iconContainer = document.createElement('div');
  iconContainer.style.display = 'flex';
  iconContainer.style.flexDirection = 'column';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'space-between';
  iconContainer.style.height = '100%';

  routes.forEach((route) => {
    const icon = createIcon(route.icon, 30);
    icon.style.marginTop = '10px';
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', () => {
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path });
      loadContent(route.path);
    });
    iconContainer.appendChild(icon);
  });

  sideNav.appendChild(iconContainer);
  document.body.appendChild(sideNav);

  // 🔄 Escuchar cambios en Redux para mostrar u ocultar
  store.subscribe(() => {
    const { isOpen } = store.getState().drawer;
    console.log(`📦 Drawer está ${isOpen ? 'abierto' : 'cerrado'}`);
    sideNav.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
  });

  return sideNav;
}
