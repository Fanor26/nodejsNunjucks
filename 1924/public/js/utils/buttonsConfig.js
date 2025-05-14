import { openPanel } from '../components/common/panel.js';
import { renderItems } from '../renders/renderItems.js';

export const itemsViewButtons = (isTableView, isSelecting) => [
  {
    label: 'Vista Lista',
    onClick: () => renderItems(true, isSelecting),
    active: isTableView,
  },
  {
    label: 'Vista Cuadrícula',
    onClick: () => renderItems(false),
    active: !isTableView,
  },
  {
    label: 'Seleccionar datos',
    onClick: () => {
      renderItems(true, true);
      openPanel();
    },
    color: '#4CAF50',
  },
];

// utils/buttons/bulkActionsButtons.js

export function bulkActionsButtons() {
  return [
    {
      label: '⚙️ Generar Masivo',
      onClick: () => {
        console.log('🚀 Generando registros masivos...');
        // Aquí puedes hacer luego el fetch a tu endpoint
        // fetch('/api/bulk-generate')...
      },
      color: '#4CAF50',
    },
    {
      label: '🛠 Servicios',
      onClick: () => {
        console.log('📦 Servicios clickeado');
      },
      color: '#2196F3',
    },
    {
      label: '💼 Especialidades',
      onClick: () => {
        console.log('📂 Especialidades clickeado');
      },
      color: '#FF9800',
    },
    {
      label: '👥 Usuarios',
      onClick: () => {
        console.log('👤 Usuarios clickeado');
      },
      color: '#f44336',
    },
  ];
}

export const menuItems = [
  {
    label: 'Item 1',
    children: [
      {
        label: 'Sub Item 1.1',
        children: [{ label: 'Sub Item 1.1.1' }, { label: 'Sub Item 1.1.2' }],
      },
      { label: 'Sub Item 1.2' },
    ],
  },
  {
    label: 'Item 2',
    children: [
      { label: 'Sub Item 2.1' },
      {
        label: 'Sub Item 2.2',
        children: [{ label: 'Sub Item 2.2.1' }, { label: 'Sub Item 2.2.2' }],
      },
    ],
  },
  { label: 'Item 3' },
  {
    label: 'Item 4',
    children: [
      { label: 'Sub Item 4.1' },
      {
        label: 'Sub Item 4.2',
        children: [{ label: 'Sub Item 4.2.1' }, { label: 'Sub Item 4.2.2' }],
      },
    ],
  },
];
