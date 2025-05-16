import { applyHoverEffect } from '../../../utils/hoverEffect.js';
import { loadPageContent } from '../../../utils/storageUtils.js';
import { createIcon } from '../icon.js';
import { createSubMenu } from './dropdwnNavigate/subMenu.js';
import { toggleSubMenu } from './utils/index.js';
import { createArrow, createLink } from './utils/elements.js';

/**
 * Crea un dropdown de navegación de forma recursiva.
 * @param {Object} route - Ruta principal con subrutas.
 * @param {boolean} isMouseEnterEnabled - Si es `true`, el submenú se muestra al pasar el mouse. Si es `false`, solo con clic.
 * @param {boolean} isMouseLeaveEnabled - Si es `true`, el submenú se cierra cuando el mouse sale del contenedor.
 * @param {number} level - Nivel de anidación del submenú, usado para asignar colores diferentes.
 * @returns {HTMLElement} - Contenedor del dropdown.
 */
export function createDropdownLinkNavigate(
  route,
  isMouseEnterEnabled = false,
  isMouseLeaveEnabled = false,
  level = 0
) {
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');
  dropdownContainer.style.position = 'relative';
  dropdownContainer.style.display = 'flex';
  dropdownContainer.style.alignItems = 'center';
  dropdownContainer.style.border = '1px solid white';
  dropdownContainer.style.marginBottom = '5px';
  dropdownContainer.style.padding = '10px';
  dropdownContainer.style.borderRadius = '5px';
  dropdownContainer.style.cursor = 'pointer';

  // Crear un contenedor para el icono, el enlace y la flecha
  const linkContent = document.createElement('div');
  linkContent.style.display = 'flex';
  linkContent.style.alignItems = 'center';
  linkContent.style.flexGrow = 1; // Esto asegura que ocupe el espacio disponible

  const link = createLink(route); // Crear el enlace principal
  // Crear el ícono y envolverlo con el enlace
  const iconContainer = createIcon(route.icon, 24); // Usar la función para crear el ícono
  linkContent.appendChild(iconContainer); // Añadir el ícono
  linkContent.appendChild(link); // Añadir el enlace
  applyHoverEffect(link, false);
  applyHoverEffect(dropdownContainer);

  // Crear la flecha para el submenú, solo si la ruta tiene subrutas
  const { arrow, arrowContainer } = createArrow(
    route.subroutes && route.subroutes.length > 0
  ); // Crear flecha
  const subMenu = createSubMenu(
    route,
    isMouseEnterEnabled,
    isMouseLeaveEnabled,
    level
  );
  // Submenú contenedor, solo si la ruta tiene subrutas

  // Manejar el clic en el contenedor principal (solo redirige a la ruta)
  link.addEventListener('click', (e) => {
    e.preventDefault();
    loadPageContent(route.path);
    closeSubmenusUpwards(dropdownContainer);
  });

  // Manejar el clic en el ícono de flecha (abre/cierra el submenú)
  if (arrow) {
    arrow.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que el evento se propague
      toggleSubMenu(subMenu, arrow); // Abrir/cerrar el submenú al hacer clic en el ícono de flecha
    });
  }

  // Función para cerrar submenús superiores
  function closeSubmenusUpwards(currentDropdown) {
    const subMenu = currentDropdown.querySelector('.submenu');
    if (subMenu) {
      subMenu.style.display = 'none';
    }

    const parentDropdown = currentDropdown.parentElement.closest(
      '.dropdown-container'
    );
    if (parentDropdown) {
      closeSubmenusUpwards(parentDropdown);
    }
  }

  // Añadir a contenedor principal
  dropdownContainer.appendChild(linkContent);
  if (arrow) arrowContainer.appendChild(arrow); // Solo añadir flecha si tiene subrutas
  if (arrow) dropdownContainer.appendChild(arrowContainer); // Añadir el contenedor de la flecha
  if (subMenu) dropdownContainer.appendChild(subMenu); // Solo añadir submenú si tiene subrutas

  return dropdownContainer;
}
