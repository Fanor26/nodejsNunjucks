import { getElementType } from './index.js'

const Container = {
  create: (config = {}) => {
    const container = document.createElement('div')

    // Asignar className si viene
    if (config.className) {
      container.className = config.className
    }

    // Estilos por defecto + los que vienen en config.styles
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '16px',
      margin: '10px 0',
      color: '#2c3e50',
      ...config.styles // Sobreescribe si viene algo
    })

    // Renderizar hijos si existen
    config.children?.forEach(child => {
      const elementType = getElementType(child.type)
      if (elementType?.create) {
        const element = elementType.create(child)
        container.appendChild(element)
      }
    })

    return container
  },

  prototypeStyle: {
    border: '1px dashed #795548',
    backgroundColor: 'rgba(121, 85, 72, 0.1)'
  }
}

export default Container
