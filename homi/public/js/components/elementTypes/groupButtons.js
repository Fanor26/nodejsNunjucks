import Button from './button.js'

const GroupButtons = {
  create: (config = {}) => {
    const container = document.createElement('div')
    container.className = 'button-group'

    // Estilos base + personalizados
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      ...config.styles
    })

    // Crear botones hijos
    if (Array.isArray(config.buttons)) {
      config.buttons.forEach(buttonConfig => {
        const button = Button.create({
          label: buttonConfig.text || 'Button',
          styles: {
            padding: '8px 16px',
            borderRadius: '4px',
            ...buttonConfig.styles
          },
          onClick: buttonConfig.onClick
        })
        container.appendChild(button)
      })
    }

    return container
  }
}

export default GroupButtons
