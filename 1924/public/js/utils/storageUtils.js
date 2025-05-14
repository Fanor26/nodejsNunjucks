// Función para desplazar la vista a un elemento con un hash
export const scrollToHash = hash => {
  const offset = 70 // Ajusta el offset según el header
  const targetElement = document.querySelector(hash)

  if (targetElement) {
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    console.log(`Scrolling to target element: ${hash}`)
  } else {
    console.warn('Elemento de destino no encontrado:', hash)
  }
}

export const executeScripts = container => {
  const scripts = container.querySelectorAll('script')
  scripts.forEach(script => {
    const newScript = document.createElement('script')
    newScript.type = script.type || 'text/javascript'
    if (script.src) {
      newScript.src = script.src
      newScript.onload = () => console.log(`${script.src} loaded.`)
    } else {
      newScript.text = script.textContent || script.innerHTML
    }
    document.body.appendChild(newScript)
  })
}
