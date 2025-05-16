// List.js
import ListItem from './ListItem.js'

const List = {
  create: (config = {}) => {
    const container = document.createElement('ul') // Usamos un <ul> para la lista
    container.className = 'list-container'

    // Estilo de la lista
    Object.assign(container.style, {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      ...config.styles
    })

    // Agregar los elementos de la lista
    ;(config.items || []).forEach(itemConfig => {
      const listItem = ListItem.create(itemConfig) // Creamos el ListItem con icono y texto
      container.appendChild(listItem)
    })

    return container
  }
}

export default List
