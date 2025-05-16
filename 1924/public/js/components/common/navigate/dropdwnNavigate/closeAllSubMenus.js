// closeAllSubmenus.js
/**
 * Cierra todos los submenús dentro de un contenedor dado.
 * @param {HTMLElement} parentContainer - Contenedor principal que contiene submenús.
 */
export function closeAllSubmenus(parentContainer) {
  console.log(
    'Cerrando todos los submenús dentro del contenedor:',
    parentContainer
  );

  const allSubmenus = parentContainer.querySelectorAll('div');
  allSubmenus.forEach((submenu) => {
    submenu.style.display = 'none';
  });

  const allArrows = parentContainer.querySelectorAll(
    'span[style*="rotate(180deg)"]'
  );
  allArrows.forEach((arrow) => {
    arrow.style.transform = 'rotate(0deg)';
    console.log('Flecha rotada a su posición inicial:', arrow);
  });
}
