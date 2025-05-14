export function createTable(data, columnHeaders) {
  // Crear la tabla
  const table = document.createElement('table');
  table.classList.add('mui-table'); // Puedes agregar clases de estilo como 'mui-table'

  // Crear encabezado de la tabla
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Crear los encabezados de columna
  columnHeaders.forEach((header) => {
    const th = document.createElement('th');
    th.innerText = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear el cuerpo de la tabla
  const tbody = document.createElement('tbody');

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    // Rellenar las celdas con los valores de cada fila
    columnHeaders.forEach((header) => {
      const td = document.createElement('td');
      td.innerText = item[header] || ''; // Si no existe un valor, poner vacío
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  return table;
}
