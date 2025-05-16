import authReducer from './authReducer.js';
import { combineReducers } from './combineReducer.js'; // Importamos el combineReducers personalizado
import itemsReducer from './itemReducer.js';

import routesUiReducer from './routesUiReducer.js';
import uiReducer from './uiReducer.js';

// Crear el rootReducer combinando el itemsReducer
const rootReducer = combineReducers({
  routing: routesUiReducer,
  pageData: itemsReducer,
  auth: authReducer,
  ui: uiReducer,

  // drawer: drawerReducer,
});

export default rootReducer;
