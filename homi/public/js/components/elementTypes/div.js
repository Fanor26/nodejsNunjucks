import { getElementType } from './index.js';

// Fallback a un tipo básico: div
const Div = {
  create: (config = {}) => {
    const div = document.createElement('div');

    if (config.className) {
      div.className = config.className;
    }

    Object.assign(div.style, config.styles || {});

    if (config.content) {
      div.innerText = config.content;
    }

    // Renderizar hijos si existen
    config.children?.forEach((child) => {
      const elementType = getElementType(child.type);
      if (elementType?.create) {
        const element = elementType.create(child);
        div.appendChild(element);
      }
    });

    return div;
  },
};
export default Div;
