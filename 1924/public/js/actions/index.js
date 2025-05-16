// actions.js
export function getAllItems() {
  return { type: 'GET_ALL' };
}
// 2. Funciones de las acciones

// a. Función para crear un ítem
export function createItem(state, payload) {
  const updatedItems = [...state, payload];
  // Guardar los items para la ruta actual en localStorage
  setItemsForPath(state.currentPath, updatedItems);
  return updatedItems;
}

// b. Función para actualizar un ítem
export function updateItem(state, payload) {
  const updatedItems = state.map((item) =>
    item.id === payload.id ? { ...item, ...payload.updates } : item
  );
  // Guardar los items para la ruta actual en localStorage
  setItemsForPath(state.currentPath, updatedItems);
  return updatedItems;
}

// c. Función para eliminar un ítem
export function deleteItem(state, payload) {
  const updatedItems = state.filter((item) => item._id !== payload._id); // Usar _id en lugar de id

  return updatedItems;
}

// Función para eliminar múltiples ítems
export function deleteItemsBulk(state, payload) {
  const updatedItems = state.filter((item) => !payload.ids.includes(item._id));

  return updatedItems;
}

// d. Función para activar un ítem
export function activateItem(state, payload) {
  const updatedItems = state.map((item) =>
    item.id === payload.id ? { ...item, active: true } : item
  );
  // Guardar los items para la ruta actual en localStorage
  setItemsForPath(state.currentPath, updatedItems);
  return updatedItems;
}

// e. Función para desactivar un ítem
export function deactivateItem(state, payload) {
  const updatedItems = state.map((item) =>
    item.id === payload.id ? { ...item, active: false } : item
  );
  // Guardar los items para la ruta actual en localStorage
  setItemsForPath(state.currentPath, updatedItems);
  return updatedItems;
}
// f. Función para obtener los ítems basados en `currentPath`
// f. Función para obtener los ítems basados en `currentPath`
export function getItemsForPath(path) {
  // Intenta obtener los ítems del localStorage basados en `currentPath`
  const items = JSON.parse(localStorage.getItem(path)) || [];
  return items;
}

// g. Función para establecer los ítems basados en `currentPath` en localStorage
