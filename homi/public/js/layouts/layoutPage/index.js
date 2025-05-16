import { createNavbar } from './navbarConfig.js';
import { createSidebar } from './sidebarConfig.js';
import { createContent } from './contentConfig.js';
import { footerElement } from './footerConfig.js';
export const createLayoutPage = (routes, routeHandler, currentPath) => {
  return {
    role: 'page',
    layout: {
      type: 'grid',
      areas: [
        ['navbar', 'navbar', 'navbar'],
        ['sidebar', 'splitter', 'content'],
        ['sidebar', 'splitter', 'footer'],
      ],
      columns: ['250px', '5px', '1fr'], // split a 3 columnas, splitter 5px ancho
      rows: ['auto', '1fr', 'auto'],
      styles: {
        height: '100vh',
        margin: '0px',
        padding: '0px',
        gridGap: '0px',
        border: '1px solid white',
      },
    },
    elements: [
      createNavbar(routes, routeHandler, currentPath),
      createSidebar(routes, routeHandler, currentPath),
      // Agregar el splitter como elemento nuevo
      {
        type: 'div',
        className: 'splitter',
        styles: {
          gridArea: 'splitter',
          backgroundColor: '#ccc',
          cursor: 'ew-resize',
          userSelect: 'none',
        },
      },
      createContent(routes, currentPath),
      footerElement,
    ],
  };
};
