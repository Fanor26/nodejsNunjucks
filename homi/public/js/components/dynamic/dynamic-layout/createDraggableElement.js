import { setupUniversalDrag } from './dragUtils.js';
import { getElementType } from '../../elementTypes/index.js';

export function createDraggableElement(config, id, draggable = true) {
  // Crear elemento base sin funcionalidad de arrastre
  const elementCreator = getElementType(config.type);
  const element = elementCreator.create(config);

  // Configuración básica del elemento
  element.id = `element-${id}`;
  element.className = `layout-element ${config.className || ''}`;
  element.dataset.type = config.type;

  // Estilos base independientes de la capacidad de arrastre
  const baseStyles = {
    position: 'relative',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    zIndex: '1',
    boxSizing: 'border-box',
    display: 'flex',
    minHeight: 'min-content',
    ...(config.styles || {}),
  };

  Object.assign(element.style, baseStyles);

  // Añadir funcionalidad de arrastre si está habilitado
  if (draggable) {
    enableDragBehavior(element, config);
  }

  return element;
}

// Función separada para la lógica de arrastre
function enableDragBehavior(element, config) {
  element.style.cursor = 'grab';

  setupUniversalDrag(element, element, {
    isContainer: false,
    onDragStart: (el) => {
      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      el.style.opacity = '0.9';
    },
    onDragEnd: (el) => {
      el.style.boxShadow = '';
      el.style.opacity = '1';
    },
    ...(config.dragOptions || {}),
  });
}
