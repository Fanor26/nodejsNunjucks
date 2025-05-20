export default function dashboardProfile() {
  let profileState = {
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    horario: 'L-V 8am-4pm',
  };

  const updateProfile = (newState) => {
    // Actualizamos el estado de perfil
    profileState = { ...profileState, ...newState };

    // Refresca el contenido con el nuevo estado
    refreshProfileContent(profileState);
  };

  // Componente inicial con los valores de perfil
  const component = {
    type: 'container',
    children: [
      {
        type: 'text',
        content: 'Perfil de Usuario',
        styles: {
          fontSize: '1.5rem',
          marginBottom: '1rem',
        },
      },
      {
        type: 'table',
        headers: ['Campo', 'Valor'],
        rows: [
          ['Nombre', profileState.nombre],
          ['Especialidad', profileState.especialidad],
          ['Horario', profileState.horario],
        ],
        styles: {
          maxWidth: '600px',
        },
      },
      {
        type: 'button',
        label: 'Actualizar Nombre',
        onClick: () => updateProfile({ nombre: 'Dr. Ana López' }),
        styles: {
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
      },
    ],
  };

  return component;
}

// Función que actualiza el contenido del perfil en el DOM
function refreshProfileContent(profileState) {
  const profileElement = document.querySelector('[data-profile="true"]');
  if (profileElement) {
    // Actualizamos las celdas de la tabla (o cualquier otro elemento que necesite actualización)
    const rows = profileElement.querySelectorAll('tr');
    rows.forEach((row) => {
      const [label, value] = row.children;
      if (label.textContent === 'Nombre') {
        value.textContent = profileState.nombre;
      }
      if (label.textContent === 'Especialidad') {
        value.textContent = profileState.especialidad;
      }
      if (label.textContent === 'Horario') {
        value.textContent = profileState.horario;
      }
    });
  }
}
