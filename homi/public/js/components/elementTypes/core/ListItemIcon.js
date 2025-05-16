// ListItemIcon.js
const ListItemIcon = {
  create: (config = {}) => {
    const icon = document.createElement('span') // Usamos un <span> para el ícono
    icon.className = 'list-item-icon'
    icon.textContent = config.icon || '' // El icono puede ser un texto, por ejemplo, "⚙️"

    Object.assign(icon.style, {
      marginRight: '12px', // Separación entre el icono y el texto
      fontSize: '1.2rem', // Puedes ajustar el tamaño del icono
      ...config.styles
    })

    return icon
  }
}

export default ListItemIcon
