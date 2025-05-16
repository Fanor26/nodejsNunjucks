// applyStylesNavbar.js

export function applyNavbarStyles(navbar, menu, menuIcon) {
  // Estilos generales para el navbar
  navbar.style.display = 'flex';
  navbar.style.alignItems = 'center';
  navbar.style.justifyContent = 'space-between';
  navbar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  navbar.style.backdropFilter = 'blur(5px)'; // Desenfoque (efecto de agua)
  navbar.style.transition = 'background-color 0.3s ease'; // Transición para el cambio de color de fondo
  navbar.style.position = 'sticky';
  navbar.style.top = '0';
  navbar.style.width = '100%';
  navbar.style.backgroundColor = '#130242';
  navbar.style.zIndex = '1000';

  // Estilos para el icono del menú (menú hamburguesa)
  menuIcon.style.cursor = 'pointer';
  menuIcon.style.marginRight = '15px';

  // Estilos para el menú (enlaces)
  menu.style.display = 'flex';
  menu.style.flexDirection = 'row';
  menu.style.backgroundColor = '#1A1A2E';
  menu.style.borderRadius = '8px';
  menu.style.marginRight = '15px';
}

export function applyMenuVisibilityStyles(menu, menuIcon, isAuthenticated) {
  const isMobile = window.innerWidth <= 768;

  // Ocultar o mostrar el menú y el ícono según el estado de autenticación y el tamaño de la pantalla
  menu.style.display = !isAuthenticated && isMobile ? 'none' : 'flex';

  if (isMobile) {
    menuIcon.style.display = 'block';
  } else {
    menuIcon.style.display = isAuthenticated ? 'block' : 'none';
  }
}
