import Popper from './popper.js';

const baseStyles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px 32px 8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minWidth: '200px',
  },
  searchIcon: {
    position: 'absolute',
    right: '8px',
    pointerEvents: 'none',
    opacity: '0.6',
  },
  table: {
    width: '100%',
    tableLayout: 'auto',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  headerCell: {
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
  },
  dataCell: {
    padding: '10px 16px',
    borderBottom: '1px solid #e0e0e0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableContainer: {
    overflowX: 'auto',
    maxHeight: '500px',
    overflowY: 'auto',
  },
};

const DataGrid = {
  create: (config) => {
    const container = document.createElement('div');
    Object.assign(container.style, {
      ...baseStyles.container,
      ...config.containerStyles,
    });

    let showCheckboxes = false;

    const headerContainer = document.createElement('div');
    Object.assign(headerContainer.style, {
      ...baseStyles.header,
    });

    const titleElement = document.createElement('h3');
    titleElement.textContent = config.title || 'Data Grid';
    Object.assign(titleElement.style, {
      ...baseStyles.title,
      ...config.titleStyles,
    });

    const controlsContainer = document.createElement('div');
    Object.assign(controlsContainer.style, {
      ...baseStyles.controls,
    });

    const searchContainer = document.createElement('div');
    Object.assign(searchContainer.style, {
      ...baseStyles.searchContainer,
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = config.searchPlaceholder || 'Buscar...';
    Object.assign(searchInput.style, {
      ...baseStyles.searchInput,
      ...config.searchStyles,
    });

    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = '🔍';
    Object.assign(searchIcon.style, {
      ...baseStyles.searchIcon,
    });

    const tbody = document.createElement('tbody');

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      tbody.querySelectorAll('tr').forEach((row) => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
      });
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Checkbox seleccionar todos que estará en header (oculto por defecto)
    let selectAllCheckbox;

    const toggleCheckboxes = () => {
      showCheckboxes = !showCheckboxes;

      // Mostrar/ocultar checkbox en header (select all)
      if (selectAllCheckbox) {
        selectAllCheckbox.style.display = showCheckboxes
          ? 'inline-block'
          : 'none';
        if (!showCheckboxes) selectAllCheckbox.checked = false;
      }

      // Mostrar/ocultar checkbox en filas
      tbody.querySelectorAll('.row-checkbox').forEach((checkbox) => {
        checkbox.style.display = showCheckboxes ? 'inline-block' : 'none';
        if (!showCheckboxes) checkbox.checked = false;
      });

      // Resetear colores de filas si se ocultan los checkboxes
      if (!showCheckboxes) {
        tbody.querySelectorAll('tr').forEach((tr, i) => {
          tr.style.backgroundColor =
            i % 2 === 0
              ? config.evenRowColor || '#ffffff'
              : config.oddRowColor || '#f8f9fa';
        });
      }
    };

    const popperInstance = Popper.create({
      icon: config.filterIcon || '⚙️',
      placement: 'bottom-start',
      items: [
        {
          text: 'Seleccionar filas',
          onClick: toggleCheckboxes,
        },
        { text: 'Filtro 1', onClick: () => console.log('Filtro 1 activado') },
        { text: 'Filtro 2', onClick: () => console.log('Filtro 2 activado') },
      ],
    });

    controlsContainer.appendChild(searchContainer);
    controlsContainer.appendChild(popperInstance);

    headerContainer.appendChild(titleElement);
    headerContainer.appendChild(controlsContainer);
    container.appendChild(headerContainer);

    const table = document.createElement('table');
    Object.assign(table.style, {
      ...baseStyles.table,
      minWidth: config.minWidth || '100%',
      ...config.tableStyles,
    });

    // Colgroup: solo 1 para la columna número (que incluye checkbox) + cols de datos
    const colgroup = document.createElement('colgroup');
    const colNumber = document.createElement('col');
    colNumber.style.width = '80px'; // algo más ancho para checkbox + número
    colgroup.appendChild(colNumber);

    config.columns.forEach((col) => {
      const colEl = document.createElement('col');
      colEl.style.minWidth = col.minWidth || '100px';
      colEl.style.width = col.width || 'auto';
      colgroup.appendChild(colEl);
    });
    table.appendChild(colgroup);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Columna número + checkbox "select all"
    const thNumber = document.createElement('th');
    thNumber.textContent = '#';
    Object.assign(thNumber.style, {
      ...baseStyles.headerCell,
      textAlign: 'center',
      whiteSpace: 'nowrap',
    });

    selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.style.marginLeft = '8px';
    selectAllCheckbox.style.display = 'none'; // Oculto al inicio
    selectAllCheckbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      tbody.querySelectorAll('.row-checkbox').forEach((checkbox) => {
        checkbox.checked = checked;
        const tr = checkbox.closest('tr');
        tr.style.backgroundColor = checked
          ? '#e3f2fd'
          : Array.from(tbody.children).indexOf(tr) % 2 === 0
          ? config.evenRowColor || '#ffffff'
          : config.oddRowColor || '#f8f9fa';
      });
    });
    thNumber.appendChild(selectAllCheckbox);
    headerRow.appendChild(thNumber);

    // Otras columnas
    config.columns.forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col.title;
      Object.assign(th.style, {
        ...baseStyles.headerCell,
        ...col.headerStyles,
      });
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear filas con checkbox junto al número
    config.data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');

      const tdNumber = document.createElement('td');
      Object.assign(tdNumber.style, {
        ...baseStyles.dataCell,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        backgroundColor:
          rowIndex % 2 === 0
            ? config.evenRowColor || '#ffffff'
            : config.oddRowColor || '#f8f9fa',
      });

      // Número de fila
      const rowNumber = document.createElement('span');
      rowNumber.textContent = rowIndex + 1;
      tdNumber.appendChild(rowNumber);

      // Checkbox fila oculto inicialmente
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'row-checkbox';
      checkbox.style.marginLeft = '8px';
      checkbox.style.display = 'none'; // Oculto al inicio
      checkbox.style.cursor = 'pointer';

      checkbox.addEventListener('change', (e) => {
        tr.style.backgroundColor = e.target.checked
          ? '#e3f2fd'
          : rowIndex % 2 === 0
          ? config.evenRowColor || '#ffffff'
          : config.oddRowColor || '#f8f9fa';
      });

      tdNumber.appendChild(checkbox);
      tr.appendChild(tdNumber);

      // Resto columnas de datos
      config.columns.forEach((col) => {
        const td = document.createElement('td');
        td.textContent = row[col.field];
        Object.assign(td.style, {
          ...baseStyles.dataCell,
          backgroundColor:
            rowIndex % 2 === 0
              ? config.evenRowColor || '#ffffff'
              : config.oddRowColor || '#f8f9fa',
          ...col.cellStyles,
        });
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    const tableContainer = document.createElement('div');
    Object.assign(tableContainer.style, {
      ...baseStyles.tableContainer,
      maxHeight: config.maxHeight || '500px',
    });

    tableContainer.appendChild(table);
    container.appendChild(tableContainer);

    return container;
  },
};

export default DataGrid;
