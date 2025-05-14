export function createHeader({
  titleText = '',
  leftContent = null,
  rightContent = null,
  iconRight = null,
  styles = {},
}) {
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.padding = styles.padding || '15px';
  header.style.borderBottom = styles.borderBottom || '2px solid #ddd';
  header.style.backgroundColor = styles.backgroundColor || '#f8f8f8';

  const left = document.createElement('div');
  left.style.display = 'flex';
  left.style.alignItems = 'center';
  left.style.gap = '10px';

  // Título
  if (titleText) {
    const title = document.createElement('h2');
    title.textContent = titleText;
    title.style.margin = '0';
    left.appendChild(title);
  }

  // Contenido extra a la izquierda (como un icono o subtítulo)
  if (leftContent) {
    if (Array.isArray(leftContent)) {
      leftContent.forEach((el) => left.appendChild(el));
    } else {
      left.appendChild(leftContent);
    }
  }

  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '10px';

  // Contenido dinámico a la derecha
  if (rightContent) {
    if (Array.isArray(rightContent)) {
      rightContent.forEach((el) => right.appendChild(el));
    } else {
      right.appendChild(rightContent);
    }
  }

  // Ícono adicional (como ⚙️)
  if (iconRight) {
    right.appendChild(iconRight);
  }

  header.appendChild(left);
  header.appendChild(right);

  return header;
}
