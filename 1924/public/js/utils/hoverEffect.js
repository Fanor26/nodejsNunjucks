export function applyHoverEffect(element, applyBackground = true) {
  element.addEventListener('mouseover', () => {
    if (!element.classList.contains('active')) {
      if (applyBackground) {
        element.style.background = 'rgba(255, 255, 255, 0.2)';
      }
   
    }
  });

  element.addEventListener('mouseout', () => {
    if (!element.classList.contains('active')) {
      if (applyBackground) {
        element.style.background = 'transparent';
      }
     
    }
  });
}

// ✅ Asegura que solo un enlace esté activo a la vez
export function setActiveLink(link, routePath, elementSelector) {
  // Guardar la ruta activa en el localStorage
  localStorage.setItem('activeRoute', routePath);

  // ❌ Quitar 'active' de todos los enlaces antes de agregarlo al actual
  const links = document.querySelectorAll(elementSelector);
  links.forEach((item) => {
    item.classList.remove('active');
    item.style.background = 'transparent';
  });

  // ✅ Agregar la clase 'active' al enlace clickeado
  link.classList.add('active');
  link.style.background = 'rgba(255, 255, 255, 0.2)'; // ✅ Fondo activo
}
