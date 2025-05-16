import { createModal, toggleModal } from '../components/custom/modal/index.js';
import { CreateText } from '../components/custom/controls/text.js';

export function createConfirmCancelButtons(onConfirm, onCancel) {
  return [
    {
      label: 'Confirmar',
      style: { backgroundColor: 'green' },
      onClick: onConfirm,
      closeOnClick: true,
      closeAll: true, // Este cierra TODOS los modales
    },
    {
      label: 'Cancelar',
      style: { backgroundColor: 'gray' },
      onClick: onCancel,
      closeOnClick: true,
      closeAll: false, // Este solo cierra el modal actual
    },
  ];
}

export function showConfirmationModal(title, message, onConfirm, size) {
  createModal(
    title,
    CreateText({ variant: 'p', text: message }),
    createConfirmCancelButtons(onConfirm, () => toggleModal(false)),
    size
  );
}
