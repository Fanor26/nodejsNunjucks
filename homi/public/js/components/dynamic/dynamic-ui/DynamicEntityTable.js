import DataGrid from '../../../components/elementTypes/dataGrid.js';
import { asyncLoadItems } from '../../../lib/asyncLoadItems.js';
import {
  setTypeEndpoint,
  setCurrentData,
} from '../../../actions/dispatchActions.js';
import { debugLog } from '../../../debug.js';
import { fetcher } from '../../../api/fetcher.js';
export default function DynamicEntityTable({ entityType = 'User' }) {
  const loadTableData = async () => {
    const tableContainer = document.querySelector('.entity-table-container');
    debugLog(`Iniciando carga de datos para ${entityType}`);

    try {
      // 1. Set type in store
      debugLog(`Estableciendo tipo en el store: ${entityType}`);
      setTypeEndpoint(entityType);

      // 2. Load data with proper validation
      debugLog(`Solicitando datos para ${entityType}`);
      const response = await fetcher({
        url: `/api/getAll?type=${entityType}`,
        method: 'GET',
        credentials: 'include',
      });

      debugLog('Respuesta completa:', response);

      // Proper data validation
      if (!response || typeof response !== 'object') {
        throw new Error('Respuesta inválida del servidor');
      }

      const result = response.success
        ? response
        : { success: false, data: response };
      const items = Array.isArray(result.data) ? result.data : [];

      if (items.length === 0) {
        debugLog(`No hay datos de ${entityType} disponibles`);
        tableContainer.textContent = `No hay ${entityType}s registrados.`;
        return;
      }

      // 3. Store data
      debugLog(`Guardando ${items.length} items en el store`);
      setCurrentData(items); // Directly pass the array

      // 4. Generate columns with proper field filtering
      const autoColumns = generateColumns(items[0], entityType);
      debugLog('Columnas generadas:', autoColumns);

      // 5. Create and render DataGrid
      const dataGrid = DataGrid.create({
        title: `${entityType}s Registrados`,
        searchPlaceholder: `Buscar ${entityType}...`,
        columns: autoColumns,
        data: items,
      });

      tableContainer.innerHTML = '';
      tableContainer.appendChild(dataGrid);
      debugLog('Tabla renderizada exitosamente');
    } catch (err) {
      debugLog(`Error al cargar ${entityType}s:`, err);
      tableContainer.textContent = `Error: ${err.message}`;
      console.error(err);
    }
  };

  // Enhanced column generator
  const generateColumns = (sampleItem, type) => {
    if (!sampleItem) {
      return [
        { field: '_id', title: 'ID', width: 100 },
        { field: 'nombre', title: 'Nombre', width: 150 },
      ];
    }

    const excludedFields = ['__v', '__t', 'password', 'createdAt', 'updatedAt'];
    const typeSpecificFields = {
      User: ['nombre', 'apellido', 'dni', 'email', 'active', 'ciudad'],
      Doctor: ['nombre', 'apellido', 'especialidad', 'matricula'],
      Paciente: ['nombre', 'apellido', 'historiaClinica'],
    };

    const fieldsToShow =
      typeSpecificFields[type] ||
      Object.keys(sampleItem).filter(
        (key) =>
          !excludedFields.includes(key) &&
          !key.startsWith('_') &&
          typeof sampleItem[key] !== 'object'
      );

    return fieldsToShow.map((key) => ({
      field: key,
      title:
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      width: 'auto',
      render: (value) => {
        if (value === undefined || value === null) return '';
        if (key === 'active') return value ? '✅ Activo' : '❌ Inactivo';
        if (typeof value === 'object') return '[...]';
        return String(value);
      },
    }));
  };

  // Initialize
  setTimeout(loadTableData, 0);

  return {
    type: 'div',

    className: 'entity-table-container',
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
