import Button from './button.js'; // Asegúrate de tener este componente correctamente importado

const Popper = {
  create: (config = {}) => {
    const container = document.createElement('div');
    container.className = 'popper-container';

    // Configuración del contenedor principal
    Object.assign(container.style, {
      display: 'inline-block',
      position: 'relative', // Asegura que el contenedor tiene una posición relativa
      ...config.containerStyles,
    });

    // Crear el botón que controlará la apertura del contenedor
    const button = Button.create({
      label: config.label || null, // Si label no está, será null
      icon: config.icon || null, // Si icon está presente, se usará en lugar del label
      styles: {
        padding: '10px 16px',
        backgroundColor: '#6200EE', // Color de fondo del botón
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex', // Asegurarse de que el botón no ocupe todo el ancho
        alignItems: 'center', // Asegura que el texto y el ícono estén alineados correctamente
        justifyContent: 'center', // Centra el contenido dentro del botón
        minWidth: 'auto', // Para no ocupar todo el ancho
        ...config.buttonStyles,
      },
      onClick: () => {
        // Mostrar u ocultar el contenedor (popper)
        popper.style.display =
          popper.style.display === 'none' ? 'block' : 'none';
      },
    });

    // Crear el contenedor del Popper (el listado de opciones)
    const popper = document.createElement('div');
    popper.className = 'popper-menu';
    popper.style.display = 'none'; // Se inicia oculto

    // Estilo del contenedor del popper
    Object.assign(popper.style, {
      position: 'absolute',
      top: '100%', // Ubicación por defecto: justo debajo del botón
      left: '0', // Alineado a la izquierda del botón
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
      minWidth: 'auto',
      width: 'max-content', // Ajusta el ancho al contenido
      ...config.menuStyles,
    });

    // Configura el placement si es necesario, usando la propiedad `placement` de la configuración
    const placement = config.placement || 'bottom-start'; // Valor por defecto si no se pasa
    switch (placement) {
      case 'top-start':
        Object.assign(popper.style, { top: 'auto', bottom: '100%', left: '0' });
        break;
      case 'top':
        Object.assign(popper.style, {
          top: 'auto',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        });
        break;
      case 'top-end':
        Object.assign(popper.style, {
          top: 'auto',
          bottom: '100%',
          right: '0',
        });
        break;
      case 'right-start':
        Object.assign(popper.style, { top: '0', left: '100%' });
        break;
      case 'right':
        Object.assign(popper.style, {
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
        });
        break;
      case 'right-end':
        Object.assign(popper.style, { bottom: '0', left: '100%' });
        break;
      case 'bottom-start':
        Object.assign(popper.style, { top: '100%', left: '0', right: 'auto' });
        break;
      case 'bottom':
        Object.assign(popper.style, {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        });
        break;
      case 'bottom-end':
        Object.assign(popper.style, {
          top: '100%',
          right: '0',
          left: 'auto',
          transform: 'none',
        });
        break;
      case 'left-start':
        Object.assign(popper.style, { top: '0', right: '100%', left: 'auto' });
        break;
      case 'left':
        Object.assign(popper.style, {
          top: '50%',
          right: '100%',
          left: 'auto',
          transform: 'translateY(-50%)',
        });
        break;
      case 'left-end':
        Object.assign(popper.style, {
          bottom: '0',
          right: '100%',
          left: 'auto',
        });
        break;
      default:
        break;
    }

    // Crear la lista de opciones
    const list = document.createElement('ul');
    list.className = 'popper-list';
    list.style.padding = '0';
    list.style.margin = '0';

    // Crear las opciones dentro de la lista
    (config.items || []).forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'popper-list-item';
      listItem.style.padding = '10px 16px';
      listItem.style.cursor = 'pointer';

      // Agregar el icono y texto
      const icon = document.createElement('span');
      icon.textContent = item.icon || '';
      listItem.appendChild(icon);

      const text = document.createElement('span');
      text.textContent = item.text || '';
      listItem.appendChild(text);

      listItem.addEventListener('mouseenter', () => {
        listItem.style.backgroundColor = '#f1f1f1';
      });

      listItem.addEventListener('mouseleave', () => {
        listItem.style.backgroundColor = '';
      });

      // Acción al hacer clic en una opción
      listItem.addEventListener('click', () => {
        if (item.onClick) {
          item.onClick();
        }
        popper.style.display = 'none'; // Cerrar el popper al seleccionar una opción
      });

      list.appendChild(listItem);
    });

    // Agregar la lista al popper
    popper.appendChild(list);

    // Agregar el botón y el contenedor del Popper al contenedor principal
    container.appendChild(button);
    container.appendChild(popper);

    // Cerrar el popper si se hace clic fuera del contenedor
    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) {
        popper.style.display = 'none'; // Cerrar si el clic no fue dentro
      }
    });

    return container;
  },
};

export default Popper;
