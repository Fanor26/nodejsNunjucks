// Función para filtrar los datos de un item
export function filterItemData(item, fieldsToFilter) {
  return Object.keys(item).filter((key) => !fieldsToFilter.includes(key));
}


import { store } from '../store/index.js';

export function filterKeys(object, excludedKeys, allowedKeys = null) {
  return Object.keys(object)
    .filter(
      (key) =>
        !excludedKeys.includes(key) &&
        (allowedKeys === null ||
          allowedKeys.length === 0 ||
          allowedKeys.includes(key))
    )
    .reduce((filtered, key) => {
      filtered[key] = object[key];
      return filtered;
    }, {});
}

// utils/filterRoutes.js// utils/filterUtils.js
