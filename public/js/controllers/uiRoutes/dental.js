import { debugLog } from '../../debug.js';
//JSON-based UI
export default function Dental() {
  return {
    type: 'container',
    children: [
      {
        type: 'dropdown', // Añadido tipo 'dropdown'
        label: 'Seleccionar Ruta',
        options: [
          { label: 'Ruta 1', value: 'ruta1' },
          { label: 'Ruta 2', value: 'ruta2' },
          { label: 'Ruta 3', value: 'ruta3' },
        ],
        onSelect: function (value) {
          debugLog('Ruta seleccionada:', value);
        },
        styles: {
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        },
      },
      {
        type: 'popper',
        label: 'Abrir Menú',
        items: [
          {
            icon: '⚙️',
            text: 'Configuración',
            onClick: () => alert('Configuración clickeada'),
          },
          {
            icon: '📁',
            text: 'Archivos',
            onClick: () => alert('Archivos clickeados'),
          },
          {
            icon: '📞',
            text: 'Llamadas',
            onClick: () => alert('Llamadas clickeadas'),
          },
        ],
        menuStyles: {
          backgroundColor: '#f0f0f0',
          color: 'black',
        },
        buttonStyles: {
          backgroundColor: '#007bff',
        },
      },
      {
        type: 'groupbuttons',
        styles: {
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        },
        buttons: [
          {
            text: 'Guardar',
            styles: {
              backgroundColor: '#4CAF50',
              color: 'white',
            },
            onClick: () => console.log('Guardado'),
          },
          {
            text: 'Cancelar',
            styles: {
              backgroundColor: '#f44336',
              color: 'white',
            },
            onClick: () => console.log('Cancelado'),
          },
        ],
      },
      {
        type: 'form',
        styles: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '2rem',
        },
        fields: [
          {
            type: 'input',
            inputType: 'text',
            name: 'nombre',
            placeholder: 'Nombre del paciente',
            required: true,
          },
          {
            type: 'input',
            inputType: 'email',
            name: 'email',
            placeholder: 'Correo electrónico',
            required: true,
          },
          {
            type: 'input',
            inputType: 'tel',
            name: 'telefono',
            placeholder: 'Teléfono',
          },
        ],
        submitButton: {
          text: 'Enviar',
          styles: {
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
          },
        },
        onSubmit: (values) => {
          debugLog('Formulario enviado:', values);
        },
        onError: (errors) => {
          debugLog('Errores en formulario:', errors);
        },
      },
    ],
  };
}
