// Función para actualizar el contador de filas seleccionadas
export function updateSelectedCount() {
  const selectedRows = document.querySelectorAll('.selectable-row.selected');
  const selectedCount = selectedRows.length;
  selectedCountContainer.textContent = ` ${selectedCount}`;

  // Imprimir el número de filas seleccionadas en la consola
  console.log(`Filas seleccionadas: ${selectedCount}`);
}
function updateSelectedItemsInStorage() {
  const selectedRows = document.querySelectorAll('.selectable-row.selected');
  const selectedIds = [...selectedRows].map((row) => row.dataset.id);
  localStorage.setItem('selectedItems', JSON.stringify(selectedIds));

  console.log('🧠 IDs guardados en localStorage:', selectedIds);
}
export function toggleRowSelection(row) {
  row.classList.toggle('selected'); // Alterna la clase
  const checkbox = row.querySelector('.row-checkbox');
  if (checkbox) {
    checkbox.checked = row.classList.contains('selected');
  }

  updateSelectedCount(); // Actualiza el contador
  updateSelectedItemsInStorage(); // 🔥 Actualiza el localStorage
}

// Maneja el evento del checkbox "Seleccionar todo"
export function setupSelectAllHandler() {
  document.addEventListener('change', (event) => {
    if (event.target.id === 'selectAllCheckbox') {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = event.target.checked;
        const row = checkbox.closest('tr');
        row.classList.toggle('selected', event.target.checked);
      });

      updateSelectedCount(); // Actualizamos el contador

      // 🔴 Si no hay filas seleccionadas, limpiamos el localStorage
      const selectedRows = document.querySelectorAll(
        '.selectable-row.selected'
      );
      if (selectedRows.length === 0) {
        console.warn(
          'No hay filas seleccionadas. Eliminando del localStorage.'
        );
        localStorage.removeItem('selectedItems'); // Borra el almacenamiento
      } else {
        // ✅ Guarda las filas seleccionadas en localStorage
        const selectedIds = [...selectedRows].map((row) => row.dataset.id);
        localStorage.setItem('selectedItems', JSON.stringify(selectedIds));
      }
    }
  });
}
console.log('🔄 Reset de selección y ocultación de checkbox completo.');
export function resetSelection() {
  // 1. Deseleccionar todas las filas
  const selectedRows = document.querySelectorAll('.selectable-row.selected');
  selectedRows.forEach((row) => {
    row.classList.remove('selected');
  });

  // 2. Ocultar y desmarcar todos los checkboxes por fila
  const rowCheckboxes = document.querySelectorAll('.row-checkbox');
  rowCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.style.display = 'none';
  });

  // 3. Limpiar el contador en el panel
  const selectedCountContainer = document.getElementById(
    'selectedCountContainer'
  );
  if (selectedCountContainer) selectedCountContainer.textContent = ' 0';

  // 4. Limpiar localStorage
  localStorage.removeItem('selectedItems');

  // 5. Ocultar la columna de encabezado de checkboxes
  const checkboxHeader = document.querySelector('.checkbox-column');
  if (checkboxHeader) checkboxHeader.style.display = 'none';

  // 6. Ocultar y desmarcar el checkbox de seleccionar todo
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  if (selectAllCheckbox) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.style.display = 'none';
  }

  // 7. Ocultar todos los <td> que contienen checkboxes (columna completa de cada fila)
  const checkboxCells = document.querySelectorAll('.checkbox-cell');
  checkboxCells.forEach((cell) => {
    cell.style.display = 'none';
  });

  console.log('✅ Reset completo: deselección, ocultamiento y limpieza hecha.');
}
