// state/sidebarState.js

import useState from '../hooks/useState.js';

export const [getSidebarOpen, setSidebarOpen, subscribeSidebar] = useState(
  'sidebarOpen',
  true
);

// 🔄 NUEVO: Loading del sidebar
export const [getSidebarLoading, setSidebarLoading, subscribeSidebarLoading] =
  useState('sidebarLoading', false);
