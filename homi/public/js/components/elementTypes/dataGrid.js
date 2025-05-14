import Button from './button.js';
import Popper from './popper.js';

const DataGrid = {
  create: (config) => {
    // Contenedor principal
    const container = document.createElement('div');
    container.className = 'data-grid-container';
    Object.assign(container.style, {
      width: '100%',
      maxWidth: '100%',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      ...config.containerStyles,
    });

    // Cabecera superior con controles
    const headerContainer = document.createElement('div');
    headerContainer.className = 'data-grid-header';
    Object.assign(headerContainer.style, {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
      flexWrap: 'wrap',
      gap: '12px',
    });

    // Título
    const titleElement = document.createElement('h3');
    titleElement.textContent = config.title || 'Data Grid';
    Object.assign(titleElement.style, {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      ...config.titleStyles,
    });

    // Controles: buscador, iconos
    const controlsContainer = document.createElement('div');
    Object.assign(controlsContainer.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    });

    // Buscador
    const searchContainer = document.createElement('div');
    Object.assign(searchContainer.style, {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = config.searchPlaceholder || 'Buscar...';
    Object.assign(searchInput.style, {
      padding: '8px 32px 8px 12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '14px',
      minWidth: '200px',
      ...config.searchStyles,
    });

    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = '🔍';
    Object.assign(searchIcon.style, {
      position: 'absolute',
      right: '8px',
      pointerEvents: 'none',
      opacity: '0.6',
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // // Botón de filtro reutilizando Button
    // const filterButton = Button.create({
    //   label: '',
    //   icon: config.filterIcon || '⚙️',
    //   buttonType: 'text',
    //   styles: {
    //     padding: '6px',
    //     borderRadius: '4px',
    //     fontSize: '18px',
    //     ...config.filterButtonStyles,
    //   },
    //   onClick: config.onFilter || (() => console.log('Filtrar presionado')),
    // });
    const popperInstance = Popper.create({
      icon: config.filterIcon || '⚙️',

      placement: 'bottom-start', // Cambia esta propiedad según necesites
      items: [
        { text: 'Filtro 1', onClick: () => console.log('Filtro 1 activado') },
        { text: 'Filtro 2', onClick: () => console.log('Filtro 2 activado') },
      ],
    });

    const plusIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <path d="M12 5v14M5 12h14"/>
</svg>`;

    const addButton = Button.create({
      icon: plusIcon,

      buttonType: 'primary',
      styles: {
        backgroundColor: '#4CAF50', // Verde para "Agregar"
        fontSize: '18px',
        padding: '6px',
        borderRadius: '6px',
        ...config.addButtonStyles, // Permite override externo
      },
      onClick: config.onAdd || (() => console.log('Agregar nuevo presionado')),
    });

    // Construcción de la cabecera
    controlsContainer.appendChild(searchContainer);
    controlsContainer.appendChild(popperInstance);
    controlsContainer.appendChild(addButton);

    headerContainer.appendChild(titleElement);
    headerContainer.appendChild(controlsContainer);
    container.appendChild(headerContainer);

    // Tabla
    const table = document.createElement('table');
    table.className = 'data-grid-table';
    Object.assign(table.style, {
      width: '100%',
      minWidth: config.minWidth || '100%',
      tableLayout: 'auto',
      borderCollapse: 'collapse',
      fontSize: '14px',
      ...config.tableStyles,
    });

    // Columnas
    const colgroup = document.createElement('colgroup');
    config.columns.forEach((col) => {
      const colEl = document.createElement('col');
      colEl.style.minWidth = col.minWidth || '100px';
      colEl.style.width = col.width || 'auto';
      colEl.style.maxWidth = col.maxWidth || '1fr';
      colgroup.appendChild(colEl);
    });
    table.appendChild(colgroup);

    // Cabecera de columnas
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    config.columns.forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col.title;
      Object.assign(th.style, {
        padding: '12px 16px',
        textAlign: 'left',
        fontWeight: '600',
        backgroundColor: '#2c3e50',
        color: 'white',
        position: 'sticky',
        top: '0',
        zIndex: '10',
        whiteSpace: 'nowrap',
        borderRight: '1px solid #3d566e',
        ...col.headerStyles,
      });
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    config.data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      tr.className = `data-row ${rowIndex % 2 === 0 ? 'even' : 'odd'}`;

      config.columns.forEach((col) => {
        const td = document.createElement('td');
        td.textContent = row[col.field];
        Object.assign(td.style, {
          padding: '10px 16px',
          borderBottom: '1px solid #e0e0e0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          backgroundColor:
            rowIndex % 2 === 0 ? config.evenRowColor : config.oddRowColor,
          ...col.cellStyles,
        });
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Contenedor para la tabla con scroll
    const tableContainer = document.createElement('div');
    Object.assign(tableContainer.style, {
      overflowX: 'auto',
      maxHeight: config.maxHeight || '500px',
      overflowY: 'auto',
    });
    tableContainer.appendChild(table);
    container.appendChild(tableContainer);

    return container;
  },
};

export default DataGrid;
