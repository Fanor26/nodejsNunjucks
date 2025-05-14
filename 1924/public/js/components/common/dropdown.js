import {
  applyStylesDropdownMenu,
  applyStylesItem,
} from '../../styles/components/common/dropdownStyles.js';
import { loadPageContent } from '../../utils/storageUtils.js';

// Función para cerrar todos los submenús de manera recursiva
export function createDropdown(
  items,
  labelKey = 'label',
  childrenKey = 'children'
) {
  console.log('tems', items);
  const ul = document.createElement('ul');
  applyStylesDropdownMenu(ul);

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item[labelKey]; // Usamos el valor dinámico para el nombre de la propiedad
    applyStylesItem(li);

    // Generar un id único para cada item basado en su label/title y su índice
    const itemId =
      item[labelKey].replace(/\s+/g, '-').toLowerCase() + `-${index}`;
    li.id = itemId;

    // Agregar un evento click al li para redirigir a la ruta
    li.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar la propagación del clic al submenú
      console.log('🔍 Objeto seleccionado:', item);
      loadPageContent(item.path, true);
      // Si el ítem tiene un path y no tiene subrutas, cargar la ruta
      if (item.path && (!item[childrenKey] || item[childrenKey].length === 0)) {
        loadPageContent(item.path, true);
      }
    });

    // Si el item tiene subrutas, agregar el icono de abrir/cerrar submenú
    if (item[childrenKey] && item[childrenKey].length) {
      // Crear un icono de apertura/cierre
      const arrowIcon = document.createElement('span');
      arrowIcon.textContent = '▶'; // Puedes cambiar esto a un ícono de SVG o FontAwesome
      arrowIcon.style.marginLeft = '10px';
      arrowIcon.style.cursor = 'pointer'; // Cambia el cursor para indicar que es interactivo
      arrowIcon.style.position = 'absolute'; // Posicionar el icono fuera del flujo del `li`
      arrowIcon.style.right = '10px'; // Elevarlo a la derecha para que no afecte el contenido

      li.style.position = 'relative'; // Para permitir que el icono se posicione absoluto dentro del li
      li.appendChild(arrowIcon);

      // Crear el submenú
      const childMenu = createDropdown(
        item[childrenKey],
        labelKey,
        childrenKey
      );
      childMenu.style.display = 'none';
      childMenu.style.marginLeft = '15px';

      // Asignar un id único también a los submenús
      childMenu.id = `${itemId}-submenu`;

      li.appendChild(childMenu);

      // Manejar clic en el ítem para mostrar/ocultar submenú cuando se hace clic en el icono
      arrowIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el clic se propague al li

        const isVisible = childMenu.style.display === 'block';

        // Alterna la visibilidad del submenú
        childMenu.style.display = isVisible ? 'none' : 'block';

        // Rotar el icono si es necesario
        if (arrowIcon) {
          arrowIcon.style.transform = isVisible
            ? 'rotate(0deg)'
            : 'rotate(90deg)';
        }

        // Cerrar todos los submenús dentro del mismo nivel
        const siblings = li.parentElement.querySelectorAll(':scope > li > ul');
        siblings.forEach((submenu) => {
          if (submenu !== childMenu) {
            closeAllSubmenus(submenu); // Cierra todo el árbol debajo
            submenu.style.display = 'none';
          }
        });
      });
    }

    ul.appendChild(li);
  });

  return ul;
}
