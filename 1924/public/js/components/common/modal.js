// Importa la función de crear íconos (si la tienes en otro archivo)
import { createIcon } from './icon.js';

/**
 * Función para mostrar y ocultar un modal común.
 * @param {boolean} isOpen - Si es verdadero, se abre el modal.
 * @param {string} content - El contenido HTML que se muestra dentro del modal.
 * @param {string} modalTitle - El título del modal (opcional).
 * @param {Function} onClose - Función que se ejecutará cuando se cierre el modal.
 * @param {Object} styles - Estilos personalizados para el modal.
 */
export function toggleCommonModal(
  isOpen,
  content = '',
  modalTitle = 'Modal',
  onClose = () => {},
  styles = {}
) {
  let modal = document.getElementById('common-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'common-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header"></div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Estilos básicos del modal
    const defaultStyles = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '2000',
    };

    const modalContent = modal.querySelector('.modal-content');
    const modalHeader = modal.querySelector('.modal-header');

    // Estilos predeterminados de la ventana modal
    const modalContentStyles = {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '300px',
      textAlign: 'center',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    };

    const modalHeaderStyles = {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '10px',
    };

    // Aplicar los estilos al modal
    Object.assign(modal.style, defaultStyles, styles); // Combina los estilos predeterminados con los personalizados
    Object.assign(modalContent.style, modalContentStyles);
    Object.assign(modalHeader.style, modalHeaderStyles);

    // Crear y agregar título del modal
    const modalTitleElement = document.createElement('h2');
    modalTitleElement.textContent = modalTitle;
    modalHeader.appendChild(modalTitleElement);

    // Crear y agregar botón de cierre
    const closeIcon = createIcon('&times;', 24, '#ff4d4d', {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: '#fff',
      backgroundColor: 'red',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
    });

    closeIcon.addEventListener('click', () => {
      toggleCommonModal(false); // Cierra el modal
      onClose(); // Ejecuta la función de cierre personalizada si se pasa
    });

    modalHeader.appendChild(closeIcon);
  }

  modal.style.display = isOpen ? 'flex' : 'none';
  modal.querySelector('.modal-body').innerHTML = content;
}
