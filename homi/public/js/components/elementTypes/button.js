const Button = {
  create: (config = {}) => {
    const button = document.createElement('button');
    button.textContent = config.label || 'Button';
    button.type = config.type || 'button';
    button.disabled = config.disabled || false;

    // Estilos base
    const baseStyles = {
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };

    // Estilos por tipo
    const typeStyles = {
      primary: {
        backgroundColor: '#6200EE',
        color: '#FFFFFF',
      },
      secondary: {
        backgroundColor: '#03DAC6',
        color: '#000000',
      },
      danger: {
        backgroundColor: '#B00020',
        color: '#FFFFFF',
      },
      text: {
        backgroundColor: 'transparent',
        color: '#6200EE',
        border: 'none',
        boxShadow: 'none',
      },
    };

    // Aplicar estilos
    const buttonType = config.buttonType || 'primary';
    Object.assign(
      button.style,
      baseStyles,
      typeStyles[buttonType],
      config.styles
    );

    // Estado hover
    button.addEventListener('mouseenter', () => {
      if (!button.disabled) {
        button.style.opacity = '0.9';
        button.style.transform = 'translateY(-1px)';
      }
    });

    button.addEventListener('mouseleave', () => {
      if (!button.disabled) {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }
    });

    // Estado disabled
    if (button.disabled) {
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
    }

    // Icono
    if (config.icon) {
      const icon = document.createElement('span');
      icon.textContent = config.icon;
      icon.style.fontSize = '1.2rem';
      button.prepend(icon);
    }

    // Evento click
    if (config.onClick) {
      button.addEventListener('click', config.onClick);
    }

    // Métodos públicos
    button.setLoading = (isLoading) => {
      button.disabled = isLoading;
      if (isLoading) {
        button.innerHTML =
          '<span class="spinner"></span> ' +
          (config.loadingText || 'Loading...');
      } else {
        button.textContent = config.label || 'Button';
        if (config.icon) {
          const icon = document.createElement('span');
          icon.textContent = config.icon;
          button.prepend(icon);
        }
      }
    };

    return button;
  },
};

export default Button;
