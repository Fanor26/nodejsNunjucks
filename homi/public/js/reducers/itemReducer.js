import {
  activateItem,
  deactivateItem,
  deleteItem,
  deleteSubItem,
  updateItem,
} from '../actions/index.js';

// reducer.js
export const initialItemsState = {
  entityType: '',
  apiSubItem: '',
  items: [],
  loading: false, // Estado de carga
};
// Acción para manejar el logout
const itemsReducer = (state = initialItemsState, action) => {
  switch (action.type) {
    case 'CREATE':
      return { ...state, items: createItem(state.items, action.payload) };
    case 'UPDATE':
      return { ...state, items: updateItem(state.items, action.payload) };
    case 'DELETE':
      return { ...state, items: deleteItem(state.items, action.payload) };

    case 'GET_ALL':
      return state;
    case 'ACTIVATE':
      return { ...state, items: activateItem(state.items, action.payload) };
    case 'DEACTIVATE':
      return { ...state, items: deactivateItem(state.items, action.payload) };

    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload }; // Actualizar el estado de `loading`

    case 'SET_TYPE_ENDPOINT':
      return { ...state, entityType: action.payload }; // Actualizar el estado de `loading`
    case 'SET_API_SUBITEM':
      return { ...state, apiSubItem: action.payload }; // Actualizar el estado de `loading`
    case 'RESET_PAGE_DATA':
      return { ...initialItemsState };
    case 'DELETE_SUBITEM':
      return {
        ...state,
        items: deleteSubItem(state.items, action.payload),
      };
    // Acción de logout

    default:
      return state;
  }
};
export default itemsReducer;
