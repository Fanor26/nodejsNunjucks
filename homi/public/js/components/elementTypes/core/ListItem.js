import ListItemIcon from './ListItemIcon.js'
import ListItemText from './ListItemText.js'

const ListItem = {
  create: (config = {}) => {
    const listItem = document.createElement('li')
    listItem.className = 'list-item'

    // Estilos base + personalizados
    Object.assign(listItem.style, {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ...config.styles
    })

    // Icono izquierdo (si existe)
    if (config.icon) {
      const icon = ListItemIcon.create({ icon: config.icon })
      listItem.appendChild(icon)
    }

    // Texto del ítem (si existe)
    if (config.text) {
      const text = ListItemText.create({ text: config.text })
      listItem.appendChild(text)
    }

    // Flecha derecha (solo si tiene hijos)
    let arrow = null
    if (config.hasChildren) {
      arrow = document.createElement('span')
      arrow.textContent = '▶'
      Object.assign(arrow.style, {
        marginLeft: 'auto',
        transition: 'transform 0.2s',
        fontSize: '0.8em',
        color: '#999'
      })
      listItem.appendChild(arrow)
    }

    // Manejo de clics
    listItem.addEventListener('click', e => {
      e.stopPropagation()

      // Si tiene hijos y se hace clic en la flecha: alternar submenú
      const clickedOnArrow = arrow && arrow.contains(e.target)
      if (config.hasChildren && clickedOnArrow) {
        const submenu = listItem.nextElementSibling
        const isClosed = submenu.style.display === 'none'
        submenu.style.display = isClosed ? 'block' : 'none'
        arrow.style.transform = isClosed ? 'rotate(90deg)' : ''
      }
      // Si no es la flecha, ejecuta la navegación (incluso en padres)
      else if (config.onClick) {
        config.onClick()
      }
    })

    return listItem
  }
}

export default ListItem
