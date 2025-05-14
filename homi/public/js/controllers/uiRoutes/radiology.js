import { createStandaloneComponent } from '../../components/elementTypes/index.js';

export default function Radiology({ refresh, state = {} }) {
  const containerRef = { current: null };

  const handleSubmit = () => {
    refresh({ submitted: true }); // Actualiza el estado
    const snackbar = createStandaloneComponent('SNACKBAR', {
      message: 'Formulario enviado',
      type: 'success',
      container: containerRef.current,
    });
    snackbar.show();
  };

  return {
    type: 'container',
    attributes: { 'data-content': 'true' },
    children: [
      {
        type: 'div',
        ref: (ref) => {
          containerRef.current = ref;
        },
      },
      {
        type: 'button',
        label: 'Enviar',
        onClick: handleSubmit,
      },
    ],
  };
}
