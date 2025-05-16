let currentDraggedElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

export function setupUniversalDrag(element, handle = element, options = {}) {
  const {
    onDragStart = () => {},
    onDragEnd = () => {},
    onDrop = () => {},
  } = options;

  handle.addEventListener('mousedown', startDrag);

  function startDrag(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    currentDraggedElement = element;
    const rect = element.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    // Guardar posición original si no existe
    if (!element.dataset.originalTransform) {
      element.dataset.originalTransform =
        element.style.transform || 'translate(0, 0)';
    }

    // Estilos durante arrastre
    element.style.position = 'fixed';
    element.style.zIndex = '1000';
    element.style.width = `${rect.width}px`;
    element.style.pointerEvents = 'none';
    element.style.cursor = 'grabbing';
    element.style.transform = 'none';
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top}px`;
    element.style.transition = 'none';
    element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);

    onDragStart(element);
  }

  function dragElement(e) {
    if (!currentDraggedElement) return;
    e.preventDefault();

    currentDraggedElement.style.left = `${e.clientX - dragOffsetX}px`;
    currentDraggedElement.style.top = `${e.clientY - dragOffsetY}px`;
  }

  function stopDrag(e) {
    if (!currentDraggedElement) return;
    e.preventDefault();

    // Calcular nueva posición relativa al padre
    const parent = element.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const newX = parseFloat(element.style.left) - parentRect.left;
    const newY = parseFloat(element.style.top) - parentRect.top;

    // Restaurar estilos y aplicar nueva posición
    element.style.position = '';
    element.style.left = '';
    element.style.top = '';
    element.style.width = '';
    element.style.zIndex = '';
    element.style.pointerEvents = '';
    element.style.cursor = '';
    element.style.boxShadow = '';
    element.style.transition = '';
    element.style.transform = `translate(${newX}px, ${newY}px)`;

    // Guardar posición persistente
    element.dataset.dragX = newX;
    element.dataset.dragY = newY;

    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);

    onDragEnd(element);
    currentDraggedElement = null;
  }
}
