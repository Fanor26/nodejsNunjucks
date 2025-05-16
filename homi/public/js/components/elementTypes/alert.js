const Alert = {
  create: ({ variant = 'info', content, styles = {} }) => {
    const alert = document.createElement('div');

    // Colores según el tipo de alerta
    const variants = {
      error: {
        bg: '#ffeeee',
        text: '#ff4444',
        border: '#ffaaaa',
      },
      success: {
        bg: '#eeffee',
        text: '#44aa44',
        border: '#aaffaa',
      },
      info: {
        bg: '#eeeeff',
        text: '#4444ff',
        border: '#aaaaff',
      },
    };

    const colors = variants[variant] || variants.info;

    Object.assign(alert.style, {
      padding: '12px 16px',
      borderRadius: '4px',
      backgroundColor: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      marginBottom: '16px',
      fontSize: '0.9rem',
      ...styles,
    });

    alert.textContent = content;
    return alert;
  },
};

export default Alert;
