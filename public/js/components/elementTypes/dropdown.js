import Button from './button.js'

const Dropdown = {
  create: (config = {}) => {
    const container = document.createElement('div')
    container.className = 'dropdown-container'

    // Configuración del contenedor principal
    Object.assign(container.style, {
      display: 'inline-block',
      position: 'relative',
      ...config.containerStyles
    })

    // Crear el botón usando el componente Button
    const button = Button.create({
      label: config.label || 'Select', // Usamos el mismo label del dropdown
      styles: {
        padding: '10px 16px',
        backgroundColor: '#6200EE', // Puedes usar colores personalizados
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...config.buttonStyles
      },
      onClick: () => {
        // Al hacer click, mostramos/ocultamos el menú desplegable
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none'
      }
    })

    // Crear el menú del dropdown
    const menu = document.createElement('div')
    menu.className = 'dropdown-menu'
    menu.style.display = 'none'

    // Estilos del menú
    Object.assign(menu.style, {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      maxHeight: '200px',
      overflowY: 'auto',
      ...config.menuStyles
    })

    // Agregar las opciones al menú
    ;(config.options || []).forEach(option => {
      const optionElement = document.createElement('div')
      optionElement.className = 'dropdown-option'
      optionElement.textContent = option.label
      optionElement.style.padding = '10px 16px'
      optionElement.style.cursor = 'pointer'

      // Estilo de la opción
      optionElement.style.transition = 'background-color 0.3s'
      optionElement.addEventListener('mouseenter', () => {
        optionElement.style.backgroundColor = '#f1f1f1'
      })
      optionElement.addEventListener('mouseleave', () => {
        optionElement.style.backgroundColor = ''
      })

      optionElement.addEventListener('click', () => {
        if (config.onSelect) {
          config.onSelect(option.value)
        }
        menu.style.display = 'none' // Cerramos el dropdown al seleccionar una opción
      })

      menu.appendChild(optionElement)
    })

    // Agregar el botón y el menú al contenedor
    container.appendChild(button) // Usamos el botón del componente Button
    container.appendChild(menu)

    // Cerrar el menú si se hace clic fuera del contenedor
    document.addEventListener('click', event => {
      if (!container.contains(event.target)) {
        menu.style.display = 'none' // Cerramos el menú si el clic no fue dentro del contenedor
      }
    })

    return container
  }
}

export default Dropdown
