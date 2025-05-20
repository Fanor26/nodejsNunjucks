export default {
  create: (config = {}) => {
    const defaultConfig = {
      message: '',
      type: 'success', // 'success' | 'error' | 'warning' | 'info'
      duration: 3000, // ms
      position: 'bottom-right', // 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
      container: null, // Contenedor personalizado (opcional)
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Crear el elemento del Snackbar
    const snackbarElement = document.createElement('div');
    snackbarElement.className = `snackbar snackbar--${finalConfig.type} snackbar--${finalConfig.position}`;
    snackbarElement.textContent = finalConfig.message;

    // Estilos base (igual que antes)
    Object.assign(snackbarElement.style, {
      position: 'fixed',
      padding: '12px 24px',
      borderRadius: '4px',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '1000',
      transition: 'opacity 0.3s, transform 0.3s',
      opacity: '0',
      transform: 'translateY(20px)',
    });

    // Posiciones (igual que antes)
    const positionStyles = {
      'top-left': { top: '20px', left: '20px' },
      'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
      'top-right': { top: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'bottom-center': {
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'bottom-right': { bottom: '20px', right: '20px' },
    };
    Object.assign(snackbarElement.style, positionStyles[finalConfig.position]);

    // Colores según tipo (igual que antes)
    const typeColors = {
      success: '#4CAF50',
      error: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    };
    snackbarElement.style.backgroundColor = typeColors[finalConfig.type];

    // Función para mostrar el Snackbar
    const show = () => {
      // 1. Usar un contenedor personalizado si existe, de lo contrario, crear uno
      const container =
        finalConfig.container ||
        document.querySelector('#snackbar-container') ||
        createSnackbarContainer();

      // 2. Añadir el Snackbar al contenedor
      container.appendChild(snackbarElement);

      // 3. Animación de entrada
      setTimeout(() => {
        snackbarElement.style.opacity = '1';
        snackbarElement.style.transform = finalConfig.position.includes(
          'center'
        )
          ? 'translateX(-50%) translateY(0)'
          : 'translateY(0)';
      }, 10);

      // 4. Auto-eliminación después de `duration`
      setTimeout(() => {
        snackbarElement.style.opacity = '0';
        setTimeout(() => {
          if (snackbarElement.parentNode) {
            snackbarElement.parentNode.removeChild(snackbarElement);
          }
        }, 300);
      }, finalConfig.duration);
    };

    // Crear un contenedor global si no existe
    const createSnackbarContainer = () => {
      const container = document.createElement('div');
      container.id = 'snackbar-container';
      container.style.position = 'fixed';
      container.style.zIndex = '1000';
      document.body.appendChild(container); // Solo se inyecta una vez
      return container;
    };

    // Métodos públicos
    return {
      element: snackbarElement,
      show,
      update: (newConfig) => {
        if (newConfig.message) snackbarElement.textContent = newConfig.message;
        if (newConfig.type) {
          snackbarElement.style.backgroundColor = typeColors[newConfig.type];
          snackbarElement.className = `snackbar snackbar--${newConfig.type} snackbar--${finalConfig.position}`;
        }
      },
    };
  },
};
