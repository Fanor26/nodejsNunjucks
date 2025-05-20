import { getElementType } from './index.js';

const Box = {
  create: (config = {}) => {
    const box = document.createElement('div'); // Base HTML div

    // Asignar className si viene
    if (config.className) {
      box.className = config.className;
    }

    // Estilos por defecto base + los de config.styles
    Object.assign(box.style, {
      boxSizing: 'border-box',
      padding: '8px',
      borderRadius: '4px',
      ...config.styles, // Sobreescriben si vienen
    });

    // Renderizar hijos si existen
    config.children?.forEach((child) => {
      const elementType = getElementType(child.type);
      if (elementType?.create) {
        const element = elementType.create(child);
        box.appendChild(element);
      }
    });

    return box;
  },

  prototypeStyle: {
    border: '1px dotted #3498db',
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
};

export default Box;
