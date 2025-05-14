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

    // Contenedor de controles (buscador, iconos)
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

    // Botón de filtro
    const filterButton = document.createElement('button');
    filterButton.innerHTML = config.filterIcon || '⚙️';
    filterButton.title = 'Filtrar';
    Object.assign(filterButton.style, {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...config.filterButtonStyles,
    });

    // Botón de agregar
    const addButton = document.createElement('button');
    addButton.innerHTML = config.addIcon || '➕';
    addButton.title = 'Agregar nuevo';
    Object.assign(addButton.style, {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...config.addButtonStyles,
    });

    // Construcción de la cabecera
    controlsContainer.appendChild(searchContainer);
    controlsContainer.appendChild(filterButton);
    controlsContainer.appendChild(addButton);

    headerContainer.appendChild(titleElement);
    headerContainer.appendChild(controlsContainer);
    container.appendChild(headerContainer);

    // Tabla (código existente)
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

    // Cabecera de columnas (sticky)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';

    config.columns.forEach((col, index) => {
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

      config.columns.forEach((col, colIndex) => {
        const td = document.createElement('td');
        const value = col.formatter
          ? col.formatter(row[col.field], row)
          : row[col.field];

        td.textContent = value;
        Object.assign(td.style, {
          padding: '10px 16px',
          borderBottom: '1px solid #e0e0e0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          backgroundColor:
            rowIndex % 2 === 0
              ? config.evenRowColor || '#f8f9fa'
              : config.oddRowColor || 'white',
          ...col.cellStyles,
          ...(col.dynamicStyles ? col.dynamicStyles(row[col.field], row) : {}),
        });

        tr.appendChild(td);
      });

      // Efecto hover
      tr.addEventListener('mouseenter', () => {
        tr.style.backgroundColor = '#e8f4fc';
      });
      tr.addEventListener('mouseleave', () => {
        tr.style.backgroundColor =
          rowIndex % 2 === 0
            ? config.evenRowColor || '#f8f9fa'
            : config.oddRowColor || 'white';
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

    // Eventos y funcionalidad
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const rows = tbody.querySelectorAll('tr');

      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells)
          .map((cell) => cell.textContent.toLowerCase())
          .join(' ');
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
      });
    });

    filterButton.addEventListener('click', () => {
      if (config.onFilter) config.onFilter();
    });

    addButton.addEventListener('click', () => {
      if (config.onAdd) config.onAdd();
    });

    return container;
  },
};

export default DataGrid;
