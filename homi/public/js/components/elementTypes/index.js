import Card from './card.js';
import Button from './button.js';
import Input from './input.js';
import Logo from './logo.js';
import Icon from './icon.js';
import Text from './text.js';
import Json from './json.js';
import Table from './table.js';
import Html from './html.js';
import Terminal from './terminal.js';
import Container from './container.js';
import Nunjucks from './nunjucks.js';
import DataGrid from './dataGrid.js';
import Dropdown from './dropdown.js'; // Importa el nuevo componente Dropdown
import List from './core/List.js';
import ListItem from './core/ListItem.js';
import ListItemText from './core/ListItemText.js';
import ListItemIcon from './core/ListItemIcon.js';
import Popper from './popper.js';
import GroupButtons from './groupButtons.js';
import Form from './form.js';
import Select from './select.js';
import Checkbox from './checkbox.js';
import Alert from './alert.js';
import Snackbar from './snackbar.js';
import Box from './box.js';
import Div from './div.js';
import { debugLog } from '../../debug.js';
export const ELEMENT_TYPES = {
  BOX: Box,
  SNACKBAR: Snackbar,
  FORM: Form,
  ALERT: Alert,
  SELECT: Select,
  CHECKBOX: Checkbox,
  GROUP_BUTTONS: GroupButtons, // Cambiado a UPPERCASE
  POPPER: Popper,
  LIST: List,
  LIST_ITEM: ListItem, // Cambiado a UPPERCASE
  LIST_ITEM_TEXT: ListItemText, // Cambiado a UPPERCASE
  LIST_ITEM_ICON: ListItemIcon, // Cambiado a UPPERCASE
  NUNJUCKS: Nunjucks,
  DATAGRID: DataGrid,
  DROPDOWN: Dropdown,
  CARD: Card,
  BUTTON: Button,
  INPUT: Input,
  LOGO: Logo,
  ICON: Icon,
  TEXT: Text,
  JSON: Json,
  CONTAINER: Container,
  TABLE: Table,
  HTML: Html,
  TERMINAL: Terminal,
  DIV: Div,
};
export const getElementType = (type) => {
  if (!type) {
    console.warn('⚠️ Tipo de componente no definido');
    return ELEMENT_TYPES.DIV;
  }

  const upperType = type.toUpperCase().replace(/-/g, '_');
  const component = ELEMENT_TYPES[upperType];

  if (!component) {
    debugLog(
      `⚠️ Tipo de componente no registrado: "${type}". Opciones disponibles:`,
      Object.keys(ELEMENT_TYPES).join(', ')
    );

    // Devolver componente "falso" con método .create()
    return {
      create: (config = {}) => {
        const el = document.createElement('div');
        el.textContent = `⚠️ Componente "${type}" no encontrado. Se usó DIV.`;
        Object.assign(el.style, {
          backgroundColor: '#fff8e1',
          color: '#ff6f00',
          padding: '1rem',
          border: '2px dashed #ff6f00',
          borderRadius: '4px',
          margin: '0.5rem 0',
        });
        return el;
      },
    };
  }

  return component;
};

export const createStandaloneComponent = (type, config = {}) => {
  const Component = getElementType(type);
  return typeof Component === 'function'
    ? Component.create(config) // Llamamos a create() si es una función
    : { ...Component, ...config };
};
