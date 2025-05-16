/**
 * Cierra el submenú y propaga el cierre hasta el padre, permitiendo reabrirlos.
 * @param {HTMLElement} element - Elemento hijo que activó el cierre.
 */
export function closeParentMenus(element) {
  let parent = element.parentElement;

  // Recorremos hacia arriba en el DOM para encontrar el contenedor del menú y submenú
  while (parent) {
    // Si el contenedor es un 'div' y el submenú está abierto, lo cerramos
    if (
      parent.tagName.toLowerCase() === 'div' &&
      parent.style.display === 'block'
    ) {
      parent.style.display = 'none';
    }

    // Buscamos el ícono de la flecha y restablecemos su rotación si es necesario
    const arrowIcon = parent.querySelector('span[style*="rotate(180deg)"]');
    if (arrowIcon) {
      arrowIcon.style.transform = 'rotate(0deg)';
    }

    // Nos movemos al contenedor superior
    parent = parent.parentElement;
  }

  // Ahora podemos permitir la apertura del submenú si el usuario hace clic de nuevo
  const targetSubmenu = element.querySelector('div');
  if (targetSubmenu && targetSubmenu.style.display === 'none') {
    // Si el submenú está cerrado, lo abrimos
    targetSubmenu.style.display = 'block';

    // Rotamos la flecha para indicar que está abierto
    const targetArrowIcon = element.querySelector('span');
    if (targetArrowIcon) {
      targetArrowIcon.style.transform = 'rotate(180deg)';
    }
  }
}
