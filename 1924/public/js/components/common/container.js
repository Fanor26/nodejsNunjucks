export function createContainer(
  index,
  backgroundColor = null,
  width = '100%',
  height = 'auto',
  contentBgColor = 'white',
  title = 'Default Title',
  footerText = 'Default Footer'
) {
  // Generar un id dinámico basado en el índice
  const contentId = `container-${index}`;

  // Crear el contenedor principal
  let container = document.createElement('div');
  container.className = 'container';

  if (backgroundColor) {
    container.style.backgroundColor = backgroundColor;
  }

  // Crear el header (título)
  let header = document.createElement('header');
  header.className = 'header';
  header.style.backgroundColor = contentBgColor;
  header.style.padding = '10px';
  header.style.textAlign = 'center';
  header.innerText = title; // Usar el título dinámico

  // Crear el contenido principal (main)
  let contentMain = document.createElement('div');
  contentMain.id = contentId; // Usar el id dinámico
  contentMain.className = 'content';
  contentMain.style.width = width;
  contentMain.style.height = height;
  contentMain.style.backgroundColor = contentBgColor;

  // Crear el footer (pie de página)
  let footer = document.createElement('footer');
  footer.className = 'footer';
  footer.style.backgroundColor = contentBgColor;
  footer.style.padding = '10px';
  footer.style.textAlign = 'center';
  footer.innerText = footerText; // Usar el texto del footer dinámico

  // Spinner (opcional)
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.display = 'none';
  contentMain.appendChild(spinner);

  // Agregar los elementos al contenedor
  container.appendChild(header);
  container.appendChild(contentMain);
  container.appendChild(footer);

  return container; // Devolver el contenedor completo
}
