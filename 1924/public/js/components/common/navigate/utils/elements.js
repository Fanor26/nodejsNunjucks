import {
  applyHoverEffect,

} from '../../../../utils/hoverEffect.js';

/**
 * Crea el enlace principal (link) de la ruta.
 * @param {Object} route - Ruta con path y título.
 * @returns {HTMLElement} - El enlace (link).
 */
export function createLink(route) {
  const link = document.createElement('a');
  link.href = route.path;
  link.textContent = route.title;
  link.style.color = 'white';
  link.style.textDecoration = 'none';
  link.style.fontSize = '18px';
  link.style.border = '1px solid white';
  link.style.display = 'inline-block';
  applyHoverEffect(link, false); // Añadir efecto hover
  return link;
}

/**
 * Crea el ícono para el menú.
 * @param {string} iconName - Nombre del icono.
 * @returns {HTMLElement} - Contenedor del ícono.
 */
export function createIconContainer(iconName) {
  return createIcon(iconName, 24);
}

/**
 * Crea la flecha para el submenú.
 * @param {boolean} hasSubroutes - Si la ruta tiene subrutas.
 * @returns {HTMLElement} - Contenedor de la flecha.
 */
export function createArrow(hasSubroutes) {
  const arrowContainer = document.createElement('div');
  const arrow = document.createElement('span');

  if (hasSubroutes) {
    arrow.textContent = ' ▶';
    arrow.style.fontSize = '15px';
    arrow.style.transform = 'rotate(0deg)';
    arrow.style.transition = 'transform 0.3s ease';
    arrow.style.transformOrigin = 'center';
    arrow.style.cursor = 'pointer';
    arrow.style.padding = '5px';
    arrow.style.color = 'white';
    applyHoverEffect(arrow, false);
  }

  arrowContainer.appendChild(arrow);
  return { arrow, arrowContainer };
}
