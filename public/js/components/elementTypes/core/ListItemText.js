// ListItemText.js
const ListItemText = {
  create: (config = {}) => {
    const text = document.createElement('span') // Usamos un <span> para el texto
    text.className = 'list-item-text'
    text.textContent = config.text || '' // Texto del ListItem

    Object.assign(text.style, {
      fontSize: '1rem', // Puedes ajustar el tamaño del texto
      color: 'white', // Aseguramos que el texto sea visible
      ...config.styles
    })

    return text
  }
}

export default ListItemText
