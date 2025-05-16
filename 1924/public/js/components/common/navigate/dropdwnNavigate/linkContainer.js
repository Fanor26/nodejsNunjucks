// linkContainer.js
import { createIcon } from '../../icon.js';
import { applyHoverEffect } from '../../../../utils/hoverEffect.js';

/**
 * Crea un contenedor de enlace (linkContainer) con icono, texto y posible flecha para submenú.
 * @param {Object} route - Información de la ruta.
 * @param {string} elementLink - Clase que se añadirá al enlace.
 * @param {boolean} hasSubroutes - Indica si tiene subrutas.
 * @returns {HTMLElement} - El contenedor de enlace.
 */
export function createLinkContainer(route, elementLink, hasSubroutes = false) {
  const linkContainer = document.createElement('a');
  linkContainer.href = route.path;
  linkContainer.style.cssText = `
    color: white;
    border: 1px solid white;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    gap: 10px;
    transition: background 0.3s, color 0.3s;
    border-radius: 5px;
  `;
  linkContainer.classList.add(elementLink);

  const contentWrapper = document.createElement('div');
  contentWrapper.style.display = 'flex';
  contentWrapper.style.alignItems = 'center';
  contentWrapper.style.gap = '10px';

  const iconContainer = createIcon(route.icon, 24);
  contentWrapper.appendChild(iconContainer);

  const textContainer = document.createElement('span');
  textContainer.textContent = route.title;
  textContainer.style.color = 'white';
  contentWrapper.appendChild(textContainer);

  linkContainer.appendChild(contentWrapper);

  let arrowIcon = null;
  if (hasSubroutes) {
    arrowIcon = createIcon('🔺', 12, 'white', 'triangle');
    arrowIcon.style.transition = 'transform 0.3s ease';
    linkContainer.appendChild(arrowIcon);
    applyHoverEffect(arrowIcon);
  }

  applyHoverEffect(linkContainer);

  return { linkContainer, arrowIcon };
}
