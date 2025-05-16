export function adjustContent() {
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');
  const content = document.getElementById('content');
  const sidebar = document.getElementById('side'); // El sidebar a la izquierda

  if (!navbar || !footer || !content || !sidebar) {
    console.warn('❌ Uno o más elementos no fueron encontrados.');
    return;
  }

  // Obtener las alturas del navbar y footer
  const navbarHeight = navbar.offsetHeight;
  const footerHeight = footer.offsetHeight;

  // Calcular la altura disponible para el contenido (restando navbar y footer)
  const availableHeight = window.innerHeight - (navbarHeight + footerHeight);

  // Aplicar la altura disponible al contenido
  content.style.height = `${availableHeight}px`;

  // Ajustar el contenido para qu se acomode a la derecha del sidebar
}

export function adjustModalContent() {
  const modal = document.getElementById('custom-modal');
  const modalHeader = document.getElementById('.modal-header');
  const modalFooter = document.getElementById('.modal-footer');
  const modalBody = document.getElementById('.modal-body');

  if (!modal || !modalHeader || !modalFooter || !modalBody) {
    console.warn('❌ Uno o más elementos no fueron encontrados en el modal.');
    return;
  }

  // Calcula la altura disponible para el contenido dentro del modal
  const modalHeaderHeight = modalHeader.offsetHeight;
  const modalFooterHeight = modalFooter.offsetHeight;

  // La altura disponible será el total de la altura de la ventana menos la altura del header y del footer
  const availableHeight =
    window.innerHeight - modalHeaderHeight - modalFooterHeight;

  // Ajusta la altura del modalBody para que ocupe el espacio restante
  modalBody.style.height = `${availableHeight}px`;
  modalBody.style.overflow = 'auto'; // Esto permite que el contenido se desplace si es necesario

  // Si el contenido es más grande que el área disponible, se agregará una barra de desplazamiento
}
