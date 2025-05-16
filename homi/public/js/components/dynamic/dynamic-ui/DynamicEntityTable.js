import DataGrid from '../../../components/elementTypes/dataGrid.js';
import { asyncLoadItems } from '[ruta-a-asyncLoadItems]';
import {
  setTypeEndpoint,
  setCurrentData,
} from '/js/actions/dispatchActions.js';

export default function DynamicEntityTable({ entityType = 'User' }) {
  const loadTableData = async () => {
    const tableContainer = document.querySelector('.entity-table-container');

    try {
      // 1. Establecer el tipo en el store (para que otras partes de la app lo sepan)
      store.dispatch(setTypeEndpoint(entityType));

      // 2. Cargar los datos (ya usa el store internamente)
      const result = await asyncLoadItems(entityType);

      if (!result?.success || !Array.isArray(result.data)) {
        tableContainer.textContent = `No se pudieron cargar los ${entityType}s.`;
        return;
      }

      // 3. Opcional: Guardar datos en el store si otros componentes los necesitan
      store.dispatch(setCurrentData(result.data));

      // 4. Renderizar tabla dinámica
      const autoColumns = generateColumns(result.data[0], entityType);

      const dataGrid = DataGrid.create({
        title: `${entityType}s Registrados`,
        searchPlaceholder: `Buscar ${entityType}...`,
        columns: autoColumns,
        data: result.data,
      });

      tableContainer.innerHTML = '';
      tableContainer.appendChild(dataGrid);
    } catch (err) {
      console.error(`Error al cargar ${entityType}s:`, err);
      tableContainer.textContent = 'Error de conexión con el servidor.';
    }
  };

  // Función para generar columnas dinámicas con configuraciones especiales
  const generateColumns = (sampleItem, type) => {
    const baseColumns = Object.keys(sampleItem || {}).map((key) => ({
      field: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      width: 'auto',
    }));

    // Configuraciones especiales por tipo
    switch (type) {
      case 'User':
        return baseColumns.map((col) => {
          if (col.field === 'id') return { ...col, width: '120px' };
          if (col.field === 'email') return { ...col, width: '2fr' };
          return col;
        });
      case 'Account':
        return baseColumns.map((col) => {
          if (col.field === 'balance') return { ...col, width: '150px' };
          return col;
        });
      default:
        return baseColumns;
    }
  };

  // Iniciar carga
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
