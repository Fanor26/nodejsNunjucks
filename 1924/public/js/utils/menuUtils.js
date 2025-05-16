// utils/menuUtils.js

import { createIcon } from '../components/common/icon.js';
import { handleActiveLink, handleHoverEffect } from './storageUtils.js';
import { createDropdownLinkNavigate } from '../components/common/navigate/dropdownLink.js'; // Suponiendo que la función está en este archivo
import { store } from '../store/index.js';

export function addLinksToMenu(routes, menu, isMobile, content) {
  routes.forEach((route) => {
    const link = document.createElement('a');
    link.href = route.path;
    link.style.color = 'white';
    link.style.textDecoration = 'none';
    link.style.fontSize = '18px';
    link.style.padding = '5px';
    link.style.display = 'inline-block';
    link.style.position = 'relative';

    // Crear el contenedor 'row' solo una vez para el ícono y el texto
    const rowContainer = document.createElement('div');
    rowContainer.style.display = 'flex'; // Usar flexbox para alinear los elementos
    rowContainer.style.alignItems = 'center'; // Alinear verticalmente
    rowContainer.style.flexDirection = 'row'; // Alinear horizontalmente (predeterminado)

    // Crear el ícono usando la nueva función
    const iconContainer = createIcon(route.icon, 30); // Pasamos el tamaño y el ícono

    // Crear el texto del enlace
    const textContainer = document.createElement('span');
    textContainer.textContent = route.title;
    textContainer.style.fontSize = '18px'; // Tamaño del texto
    textContainer.style.color = 'white'; // Color del texto

    // Añadir el ícono y el texto al contenedor 'row'
    rowContainer.appendChild(iconContainer);
    rowContainer.appendChild(textContainer);

    // Añadir el contenedor 'row' al enlace
    link.appendChild(rowContainer);

    handleActiveLink(link, route.path);
    handleHoverEffect(link);

    // Si la ruta tiene subrutas, las agregamos como un dropdown
    if (route.subroutes && route.subroutes.length > 0) {
      const dropdown = createDropdownLinkNavigate(route);
      menu.appendChild(dropdown);
    } else {
      // Si la ruta no tiene subrutas, solo añadimos el enlace
      menu.appendChild(link);
    }

    // Cuando se hace clic en un enlace, se cierra el menú solo si es móvil o si el menú está en formato columna
    link.addEventListener('click', (e) => {
      e.preventDefault();
      store.dispatch({ type: 'SET_CURRENT_PATH', payload: route.path });
      loadPageContent(route.path);

      // Cerrar el menú si es móvil o si el menú está en formato columna
      if (isMobile) {
        menu.style.display = 'none'; // Ocultar el menú
        content.style.marginLeft = '0'; // Asegurarse de que el contenido ocupe el 100% del ancho
      }
    });
  });
}
