import { generateIcon } from '../generate/generateIcons.js';

// Estilos por nivel de profundidad
const levelStyles = [
  {}, // Nivel 0 (raíz)
  { background: 'rgba(255,255,255,0.03)' }, // Nivel 1
  { background: 'rgba(255,255,255,0.06)' }, // Nivel 2
  { background: 'rgba(255,255,255,0.09)' }, // Nivel 3+
];

export const buildNestedMenu = (
  items,
  onRouteClick,
  currentPath,
  level = 0
) => {
  return items.map((item) => {
    const hasChildren = item.children?.length > 0;
    const isActive = currentPath === item.path;

    const listItemConfig = {
      icon: item.icon || generateIcon(item.title),
      text: item.title,
      hasChildren,
      styles: {
        background: isActive
          ? 'rgba(255,255,255,0.2)'
          : levelStyles[level]?.background || 'transparent',
        color: 'white',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '4px',
        marginBottom: '4px',
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s ease',
      },
      onClick: () => onRouteClick?.(item.path),
    };

    if (!hasChildren) return { type: 'listitem', ...listItemConfig };

    return {
      type: 'container',
      styles: { display: 'flex', flexDirection: 'column' },
      children: [
        { type: 'listitem', ...listItemConfig },
        {
          type: 'container',
          styles: {
            display: 'none', // Submenú oculto inicialmente
            flexDirection: 'column',
          },
          children: buildNestedMenu(
            item.children,
            onRouteClick,
            currentPath,
            level + 1
          ),
        },
      ],
    };
  });
};
