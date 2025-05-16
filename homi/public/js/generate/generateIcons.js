export const generateIcon = title => {
  if (!title) return '⚡' // Ícono por defecto más potente

  const iconMap = {
    // Navegación principal
    dashboard: '🎯', // Blanco - enfoque directo
    inicio: '🚀', // Cohete - inicio rápido
    home: '🏠', // Hogar

    // Usuarios
    usuarios: '🦸', // Superhéroe - usuarios poderosos
    users: '🦸',

    // Productos
    productos: '💎', // Diamante - productos valiosos
    products: '💎',

    // Configuración
    ajustes: '🛠️', // Herramientas - ajustes prácticos
    settings: '🛠️',

    // Perfil
    perfil: '🧔', // Persona - perfil claro
    profile: '🧔',

    // Reportes
    reportes: '📈', // Gráfico ascendente - reportes de crecimiento
    reports: '📈',

    // Ventas
    ventas: '💰', // Dinero
    sales: '💰',

    // Especialidades médicas
    especialidades: '🏥',
    specialties: '🏥',
    dental: '🦷', // Diente
    medical: '🩺', // Estetoscopio (más profesional)
    radiología: '📟', // Dispositivo médico
    radiology: '📟',

    // Información
    'sobre nosotros': 'ℹ️',
    about: 'ℹ️',

    // Autenticación
    'iniciar sesion': '🔐', // Candado - seguridad
    login: '🔐',
    registrarse: '🆔', // ID - registro claro
    register: '🆔',

    // Sistema
    configuración: '⚙️'
  }

  // Normalización poderosa
  const normalizedTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .trim()

  return iconMap[normalizedTitle] || '⚡' // Ícono predeterminado energético
}
