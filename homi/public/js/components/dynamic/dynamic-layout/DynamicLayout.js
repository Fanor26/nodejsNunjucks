// import { createRoleBaseStyles } from '../../../styles/baseStyles.js';
// import { getElementType } from '../../elementTypes/index.js';

// export function DynamicLayout(config = {}) {
//   const {
//     role = 'content',
//     layout = null,
//     elements = [],
//     columns = 3,
//     styles = {},
//     containerClass = '',
//     ...otherProps
//   } = config;

//   // Crear contenedor principal
//   const layoutContainer = document.createElement('div');
//   layoutContainer.className = `dynamic-layout ${role} ${containerClass}`;
//   layoutContainer.dataset.role = role;

//   // Estilos base del contenedor
//   const baseContainerStyles = {
//     boxSizing: 'border-box',
//     ...createRoleBaseStyles(role, styles),
//     ...styles,
//   };

//   // Estilos de grid
//   const gridStyles = layout
//     ? {
//         display: 'grid',
//         gridTemplateColumns: layout.columns.join(' '),
//         gridTemplateRows: layout.rows.join(' '),
//         gridTemplateAreas: layout.areas
//           .map((row) => `"${row.join(' ')}"`)
//           .join(' '),
//         ...(layout.styles || {}),
//       }
//     : {
//         display: 'grid',
//         gridTemplateColumns: `repeat(${columns}, 1fr)`,
//         gap: '8px',
//       };

//   // Aplicar todos los estilos
//   Object.assign(layoutContainer.style, {
//     ...baseContainerStyles,
//     ...gridStyles,
//   });

//   // Función para crear elementos simples (sin drag)
//   const createSimpleElement = (elementConfig) => {
//     const elementCreator = getElementType(elementConfig.type);
//     const element = elementCreator.create(elementConfig);

//     element.className = `layout-element ${elementConfig.className || ''}`;
//     element.dataset.type = elementConfig.type;

//     // Estilos básicos
//     Object.assign(element.style, {
//       position: 'relative',
//       boxSizing: 'border-box',
//       display: 'flex',
//       minHeight: 'min-content',
//       ...(elementConfig.styles || {}),
//     });

//     return element;
//   };

//   // Procesar elementos recursivamente
//   const processElement = (elementConfig, parentElement) => {
//     if (elementConfig.type === 'container') {
//       const container = document.createElement('div');
//       Object.assign(container.style, elementConfig.styles || {});

//       if (elementConfig.area) {
//         container.style.gridArea = elementConfig.area;
//       }

//       if (elementConfig.children) {
//         elementConfig.children.forEach((child) => {
//           processElement(child, container);
//         });
//       }

//       parentElement.appendChild(container);
//     } else {
//       const element = createSimpleElement(elementConfig);
//       parentElement.appendChild(element);
//     }
//   };

//   // Añadir elementos iniciales
//   elements.forEach((element) => {
//     processElement(element, layoutContainer);
//   });

//   // API pública
//   layoutContainer.addElement = (elementConfig, parentSelector = null) => {
//     const parent = parentSelector
//       ? layoutContainer.querySelector(parentSelector)
//       : layoutContainer;

//     if (!parent) {
//       console.error('Parent element not found:', parentSelector);
//       return null;
//     }

//     const elementId = `element-${Math.random().toString(36).slice(2, 9)}`;
//     processElement({ ...elementConfig, id: elementId }, parent);
//     return elementId;
//   };

//   layoutContainer.removeElement = (elementId) => {
//     const element = layoutContainer.querySelector(`#${elementId}`);
//     if (element) {
//       element.remove();
//       return true;
//     }
//     return false;
//   };

//   return layoutContainer;
// }
import { createRoleBaseStyles } from '../../../styles/baseStyles.js';
import { getElementType } from '../../elementTypes/index.js';
import { setupUniversalDrag } from './dragUtils.js';

export function DynamicLayout(config = {}) {
  const {
    role = 'content',
    layout = null,
    elements = [],
    columns = 3,
    styles = {},
    draggable = false,
    containerClass = '',
    ...otherProps
  } = config;

  // Crear contenedor principal
  const layoutContainer = document.createElement('div');
  layoutContainer.className = `dynamic-layout ${role} ${containerClass}`;
  layoutContainer.dataset.role = role;

  // Aplicar estilos
  Object.assign(layoutContainer.style, {
    boxSizing: 'border-box',
    ...createRoleBaseStyles(role, styles),
    ...(layout
      ? {
          display: 'grid',
          gridTemplateColumns: layout.columns.join(' '),
          gridTemplateRows: layout.rows.join(' '),
          gridTemplateAreas: layout.areas
            .map((row) => `"${row.join(' ')}"`)
            .join(' '),
          ...(layout.styles || {}),
        }
      : {
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '8px',
        }),
    ...styles,
  });

  // Función para crear elementos con persistencia
  const createElement = (elementConfig) => {
    const elementCreator = getElementType(elementConfig.type);
    const element = elementCreator.create(elementConfig);

    element.className = `layout-element ${elementConfig.className || ''}`;
    element.dataset.type = elementConfig.type;

    // Restaurar posición guardada si existe
    if (
      elementConfig.dragX !== undefined &&
      elementConfig.dragY !== undefined
    ) {
      element.style.transform = `translate(${elementConfig.dragX}px, ${elementConfig.dragY}px)`;
    }

    // Estilos base
    Object.assign(element.style, {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      minHeight: 'min-content',
      transition: 'transform 0.2s ease',
      ...(elementConfig.styles || {}),
    });

    // Configurar drag si está habilitado
    const isDraggable =
      elementConfig.draggable !== undefined
        ? elementConfig.draggable
        : draggable;

    if (isDraggable) {
      element.style.cursor = 'grab';
      element.style.userSelect = 'none';

      setupUniversalDrag(element, element, {
        onDragStart: (el) => {
          el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          el.style.opacity = '0.9';
          el.style.cursor = 'grabbing';
        },
        onDragEnd: (el) => {
          el.style.boxShadow = '';
          el.style.opacity = '1';
          el.style.cursor = 'grab';

          // Actualizar la configuración con la nueva posición
          const transform = el.style.transform.match(/translate\(([^)]+)\)/);
          if (transform) {
            const [x, y] = transform[1].split(',').map(parseFloat);
            elementConfig.dragX = x;
            elementConfig.dragY = y;
          }
        },
      });
    }

    return element;
  };

  // ... (resto del código de processElement y API pública permanece igual)
  const processElement = (elementConfig, parentElement) => {
    if (elementConfig.type === 'container') {
      const container = document.createElement('div');
      Object.assign(container.style, elementConfig.styles || {});

      if (elementConfig.area) {
        container.style.gridArea = elementConfig.area;
      }

      if (elementConfig.children) {
        elementConfig.children.forEach((child) => {
          processElement(child, container);
        });
      }

      parentElement.appendChild(container);
    } else {
      const element = createElement(elementConfig);
      parentElement.appendChild(element);
    }
  };

  // Añadir elementos iniciales
  elements.forEach((element) => {
    processElement(element, layoutContainer);
  });

  // API pública
  layoutContainer.addElement = (elementConfig, parentSelector = null) => {
    const parent = parentSelector
      ? layoutContainer.querySelector(parentSelector)
      : layoutContainer;

    if (!parent) {
      console.error('Parent element not found:', parentSelector);
      return null;
    }

    const elementId = `element-${Math.random().toString(36).slice(2, 9)}`;
    processElement({ ...elementConfig, id: elementId }, parent);
    return elementId;
  };

  return layoutContainer;
}
