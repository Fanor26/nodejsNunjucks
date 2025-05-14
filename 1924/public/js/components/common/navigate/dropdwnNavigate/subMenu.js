import { createDropdownLinkNavigate } from '../dropdownLink.js';

/**
 * Crea el submenú si tiene subrutas.
 * @param {Object} route - Ruta con subrutas.
 * @param {number} level - Nivel de anidación del submenú.
 * @returns {HTMLElement} - Contenedor del submenú.
 */
export function createSubMenu(
  route,
  isMouseEnterEnabled,
  isMouseLeaveEnabled,
  level
) {
  const subMenu = document.createElement('div');
  if (route.subroutes && route.subroutes.length > 0) {
    subMenu.classList.add('submenu');
    subMenu.style.display = 'none';
    subMenu.style.position = 'absolute';
    subMenu.style.top = '100%';
    subMenu.style.left = '0';
    subMenu.style.padding = '5px 0px';
    subMenu.style.borderRadius = '5px';
    subMenu.style.zIndex = '1000';
    subMenu.style.width = '100%';

    // Colores de fondo
    const backgroundColors = ['#222', '#333', '#444', '#555', '#666'];
    subMenu.style.backgroundColor =
      backgroundColors[level] || backgroundColors[backgroundColors.length - 1];

    // Crear subrutas recursivamente
    route.subroutes.forEach((subroute) => {
      const nestedDropdown = createDropdownLinkNavigate(
        subroute,
        isMouseEnterEnabled,
        isMouseLeaveEnabled,
        level + 1
      );
      subMenu.appendChild(nestedDropdown);
    });
  }
  return subMenu;
}
