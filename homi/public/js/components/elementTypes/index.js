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
export const ELEMENT_TYPES = {
  BOX: Box,
  SNACKBAR: Snackbar,
  FORM: Form,
  ALERT: Alert,
  SELECT: Select,
  CHECKBOX: Checkbox,
  GROUPBUTTONS: GroupButtons,
  POPPER: Popper,
  LIST: List,
  LISTITEM: ListItem,
  LISTITEMTEXT: ListItemText,
  LISTITEMICON: ListItemIcon,
  NUNJUCKS: Nunjucks,
  DATAGRID: DataGrid,
  DROPDOWN: Dropdown, // Añade el tipo DROPDOWN
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
  return ELEMENT_TYPES[type?.toUpperCase()] || ELEMENT_TYPES.DIV;
};

export const createStandaloneComponent = (type, config = {}) => {
  const Component = getElementType(type);
  return typeof Component === 'function'
    ? Component.create(config) // Llamamos a create() si es una función
    : { ...Component, ...config };
};
