// import DataGrid from '../../../components/elementTypes/dataGrid.js';

// export default function UserTable() {
//   const loadUserTable = async () => {
//     const tableContainer = document.querySelector('.users-table-container');

//     try {
//       const res = await fetch('/crud/users');
//       const json = await res.json();

//       if (!json.success || !Array.isArray(json.data)) {
//         tableContainer.textContent = 'No se pudieron cargar los usuarios.';
//         return;
//       }

//       const dataGrid = DataGrid.create({
//         title: 'Usuarios Registrados',
//         searchPlaceholder: 'Buscar por nombre, email, etc.',
//         columns: [
//           {
//             field: 'id',
//             title: 'ID',
//             width: '120px',
//             cellRenderer: (id) => id.slice(0, 8) + '...',
//           },
//           {
//             field: 'nombre',
//             title: 'Nombre',
//             width: '1fr',
//           },
//           {
//             field: 'apellido',
//             title: 'Apellido',
//             width: '1fr',
//           },
//           {
//             field: 'dni',
//             title: 'DNI',
//             width: '120px',
//           },
//           {
//             field: 'tipo',
//             title: 'Tipo',
//             width: '120px',
//           },
//         ],
//         data: json.data,
//       });

//       tableContainer.innerHTML = '';
//       tableContainer.appendChild(dataGrid);
//     } catch (err) {
//       console.error('Error al cargar usuarios:', err);
//       tableContainer.textContent = 'Error al conectar con el servidor.';
//     }
//   };

//   // Llamar al cargar
//   setTimeout(loadUserTable, 0);

//   return {
//     type: 'div',
//     className: 'users-table-container',
//     styles: {
//       padding: '2rem',
//       backgroundColor: '#fefefe',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       minHeight: '300px',
//     },
//     content: 'Cargando usuarios...',
//   };
// }

import DataGrid from '../../../components/elementTypes/dataGrid.js';
import { debugLog } from '../../../debug.js';

export default function UserTable() {
  const loadUserTable = async () => {
    const tableContainer = document.querySelector('.users-table-container');

    try {
      const res = await fetch('/api/getAll?type=Doctor');
      const json = await res.json();
      debugLog('sdassssss', json.data);
      if (!json.success || !Array.isArray(json.data)) {
        tableContainer.textContent = 'No se pudieron cargar los usuarios.';
        return;
      }

      const autoColumns = Object.keys(json.data[0] || {}).map((key) => ({
        field: key,
        title: key.charAt(0).toUpperCase() + key.slice(1),
        width: 'auto',
      }));

      const dataGrid = DataGrid.create({
        title: 'Usuarios Registrados',
        searchPlaceholder: 'Buscar por nombre, email, etc.',
        columns: autoColumns, // se generan automáticamente
        data: json.data,
      });

      tableContainer.innerHTML = '';
      tableContainer.appendChild(dataGrid);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      tableContainer.textContent = 'Error al conectar con el servidor.';
    }
  };

  // Llamar al cargar
  setTimeout(loadUserTable, 0);

  return {
    type: 'div',
    className: 'users-table-container',
    styles: {
      padding: '2rem',
      backgroundColor: '#fefefe',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      minHeight: '300px',
    },
    content: 'Cargando usuarios...',
  };
}
