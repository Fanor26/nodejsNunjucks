import Home from './uiRoutes/home.js';
import Login from './uiRoutes/login.js';
// import { renderItems } from './renderItems.js';

export const renderers = {
  home: Home,
  login: Login,
  //   items: (container) => renderItems(container, true), // Primera vez: vista tabla + carga API
};
