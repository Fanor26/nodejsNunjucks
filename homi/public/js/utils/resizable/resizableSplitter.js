// resizableSplitter.js

/**
 * Inicializa un splitter resizable entre dos elementos dentro de un contenedor grid.
 * @param {HTMLElement} container - El contenedor con display:grid
 * @param {HTMLElement} splitter - El elemento splitter que se arrastra
 * @param {Object} options - Opciones para configurar tamaños mínimos y máximos
 * @param {number} options.minWidth - Ancho mínimo del panel izquierdo (por defecto 100)
 * @param {number} options.maxWidth - Ancho máximo del panel izquierdo (por defecto ancho del contenedor - 100)
 */
export function makeSplitterResizable(container, splitter, options = {}) {
  const minWidth = options.minWidth ?? 100;

  let isDragging = false;

  splitter.style.cursor = 'ew-resize';

  splitter.addEventListener('mousedown', () => {
    isDragging = true;
    splitter.classList.add('dragging');
    document.body.style.userSelect = 'none'; // evita selección molesta
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      splitter.classList.remove('dragging');
      document.body.style.userSelect = '';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;

    const maxWidth = options.maxWidth ?? rect.width - minWidth;

    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    container.style.gridTemplateColumns = `${newWidth}px ${splitter.offsetWidth}px 1fr`;
  });
}
