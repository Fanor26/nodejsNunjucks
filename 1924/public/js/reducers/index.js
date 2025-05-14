import authReducer from './authReducer.js';
import { combineReducers } from './combineReducer.js'; // Importamos el combineReducers personalizado
import itemsReducer from './itemReducer.js'; // Importamos el itemsReducer
import routerReducer from './routerReducer.js';
import uiReducer from './uiReducer.js';

// Crear el rootReducer combinando el itemsReducer
const rootReducer = combineReducers({
  router: routerReducer,
  pageData: itemsReducer, // Aquí puedes agregar otros reducers como 'auth', 'user', etc.
  auth: authReducer,
  ui: uiReducer,

  // drawer: drawerReducer,
});

export default rootReducer;
