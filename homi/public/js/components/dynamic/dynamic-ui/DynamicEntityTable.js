import DataGrid from '../../../components/elementTypes/dataGrid.js';
import { asyncLoadItems } from '../../../lib/asyncLoadItems.js';
import { debugLog } from '../../../debug.js';

function createContainerConfig(entityType) {
  return {
    type: 'div',
    className: `entity-table-container-${entityType.toLowerCase()}`,
    styles: {
      padding: '2rem',
      backgroundColor: '#fefefe',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      minHeight: '300px',
    },
    content: `Cargando ${entityType}s...`,
  };
}

export default function DynamicEntityTable({ entityType = 'User' }) {
  const containerConfig = createContainerConfig(entityType);

  const loadTableData = async () => {
    const tableContainer = document.querySelector(
      `.${containerConfig.className}`
    );

    if (!tableContainer) {
      debugLog(`Contenedor no encontrado: ${containerConfig.className}`);
      return;
    }

    try {
      const {
        success,
        data: items,
        firstItem,
      } = await asyncLoadItems(entityType);

      if (!success || !items) {
        tableContainer.textContent = `No hay ${entityType}s registrados.`;
        return;
      }

      // Generación de columnas optimizada
      const autoColumns = generateColumns(firstItem);

      const dataGrid = DataGrid.create({
        title: `${entityType}s Registrados`,
        searchPlaceholder: `Buscar ${entityType}...`,
        columns: autoColumns,
        data: items,
      });

      tableContainer.innerHTML = '';
      tableContainer.appendChild(dataGrid);
    } catch (error) {
      tableContainer.textContent = `Error: ${error.message}`;
      console.error(error);
    }
  };

  // Función auxiliar para generación de columnas
  const generateColumns = (sampleItem) => {
    if (!sampleItem) return [];

    return Object.keys(sampleItem).map((key) => ({
      field: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      width: 'auto',
      render: (value) => {
        if (value == null) return '';
        if (typeof value === 'object') return '[...]';
        return String(value);
      },
    }));
  };

  setTimeout(loadTableData, 50);

  return containerConfig;
}
