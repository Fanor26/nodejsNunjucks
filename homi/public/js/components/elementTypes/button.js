const Button = {
  create: (config = {}) => {
    const button = document.createElement('button');
    button.type = config.type || 'button';
    button.disabled = config.disabled || false;

    // Estilos base
    const baseStyles = {
      padding: config.label ? '12px 24px' : '8px',
      width: config.label ? 'auto' : '36px',
      height: config.label ? 'auto' : '36px',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: config.label ? '8px' : '0px',
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

    const buttonType = config.buttonType || 'primary';
    Object.assign(
      button.style,
      baseStyles,
      typeStyles[buttonType],
      config.styles
    );

    // Icono (acepta SVG o HTMLElement)
    if (config.icon) {
      const iconWrapper = document.createElement('span');

      if (typeof config.icon === 'string') {
        iconWrapper.innerHTML = config.icon; // SVG string
      } else if (config.icon instanceof HTMLElement) {
        iconWrapper.appendChild(config.icon); // Nodo real
      }

      iconWrapper.style.fontSize = '1.2rem';
      button.appendChild(iconWrapper);
    }

    // Label (si hay)
    if (config.label) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = config.label;
      button.appendChild(labelSpan);
    }

    // Hover effect
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

    // Estado disabled visual
    if (button.disabled) {
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
    }

    // Evento onClick
    if (config.onClick) {
      button.addEventListener('click', config.onClick);
    }

    // Método público setLoading
    button.setLoading = (isLoading) => {
      button.disabled = isLoading;
      button.innerHTML = '';

      if (isLoading) {
        button.innerHTML = `<span class="spinner"></span> ${
          config.loadingText || 'Loading...'
        }`;
      } else {
        if (config.icon) {
          const iconWrapper = document.createElement('span');

          if (typeof config.icon === 'string') {
            iconWrapper.innerHTML = config.icon;
          } else if (config.icon instanceof HTMLElement) {
            iconWrapper.appendChild(config.icon);
          }

          iconWrapper.style.fontSize = '1.2rem';
          button.appendChild(iconWrapper);
        }

        if (config.label) {
          const labelSpan = document.createElement('span');
          labelSpan.textContent = config.label;
          button.appendChild(labelSpan);
        }
      }
    };

    return button;
  },
};

export default Button;
