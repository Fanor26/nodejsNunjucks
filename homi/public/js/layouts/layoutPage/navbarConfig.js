import { debugLog } from '../../debug.js';
import { handleRouteChange } from '../../router/routerSingle.js';
import { store } from '../../store/index.js';
import { logout } from '../../actions/authActions.js';
import { navbarStyles } from './utils/styles/navbarStyles.js';
import { loadRoutes } from '../../services/loadRoutes.js';

export const createNavbar = (
  menuItems = [],
  onRouteClick,
  currentPath = '/'
) => {
  debugLog('Rutas cargadas para Navbar:', menuItems);

  // Estado de autenticación
  const { auth } = store.getState();
  const { user, session } = auth || {};
  const isAuthenticated = auth.isAuthenticated;
  const displayName =
    user?.displayName ||
    user?.name ||
    user?.username ||
    session?.userName ||
    'Usuario';
  const avatarUrl =
    user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg';

  // Elementos del navbar
  const logo = {
    type: 'text',
    content: 'Clínica Gran Potosí',
    styles: navbarStyles.logoText,
  };

  const leftContainer = {
    type: 'container',
    styles: navbarStyles.leftContainer,
    children: [logo],
  };

  // Menú central
  const menuItemsFiltered = menuItems.filter(
    (r) => !['/login', '/register', '/logout'].includes(r.path)
  );

  const centerItems = menuItemsFiltered.map((route) => ({
    type: 'list-item',
    text: route.title,
    styles: {
      ...navbarStyles.menuItem,
      ...(route.path === currentPath && navbarStyles.activeMenuItem),
    },
    onClick: () => onRouteClick(route.path),
  }));

  const centerContainer = {
    type: 'container',
    styles: navbarStyles.centerContainer,
    children: centerItems,
  };

  // Contenedor derecho (auth)
  const rightChildren = isAuthenticated
    ? [
        // {
        //   type: 'avatar',
        //   image: avatarUrl,
        //   size: '2.5rem',
        //   styles: navbarStyles.avatar,
        // },
        {
          type: 'text',
          content: displayName,
          styles: navbarStyles.userName,
        },
        {
          type: 'button',
          label: 'Cerrar sesión',
          styles: navbarStyles.logoutButton,
          onClick: async () => {
            await logout();
            await loadRoutes();
            handleRouteChange('/login');
          },
        },
      ]
    : menuItems
        .filter((r) => ['/login', '/register'].includes(r.path))
        .map((route) => ({
          type: 'button',
          label: route.title,
          styles: {
            ...navbarStyles.authButton,
            ...(route.path === '/register' && navbarStyles.registerButton),
          },
          onClick: () => onRouteClick(route.path),
        }));

  const rightContainer = {
    type: 'container',
    styles: navbarStyles.rightContainer,
    children: rightChildren,
  };

  // Navbar completo
  return {
    type: 'container',
    area: 'navbar',
    tag: 'header',
    styles: navbarStyles.navbar,
    children: [leftContainer, centerContainer, rightContainer],
  };
};
