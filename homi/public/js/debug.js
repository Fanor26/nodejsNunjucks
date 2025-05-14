const APP_CONFIG = {
  debugMode: true,
};

// Tipos de log soportados y sus colores
const LOG_TYPES = {
  log: { color: 'lime', consoleMethod: 'log' },
  info: { color: 'cyan', consoleMethod: 'info' },
  warn: { color: 'yellow', consoleMethod: 'warn' },
  error: { color: 'red', consoleMethod: 'error' },
  debug: { color: 'magenta', consoleMethod: 'debug' },
};

const MAX_LOGS = 10; // Solo mostrar últimos 10 logs en la UI

const debugLog = (message, ...optionalParams) => {
  if (!APP_CONFIG.debugMode) return;

  // Detectar si el último argumento es un tipo de log (string: 'info', 'warn', etc.)
  const lastParam = optionalParams[optionalParams.length - 1];
  const type =
    typeof lastParam === 'string' && LOG_TYPES[lastParam]
      ? optionalParams.pop()
      : 'log';

  const logType = LOG_TYPES[type] || LOG_TYPES.log;
  const consoleMethod = console[logType.consoleMethod]
    ? logType.consoleMethod
    : 'log';

  // Formatear cada parámetro como JSON.stringify si es necesario
  const formatParam = (param) => {
    try {
      return typeof param === 'string' ? param : JSON.stringify(param, null, 2);
    } catch {
      return String(param);
    }
  };

  const formattedMessage = [message, ...optionalParams]
    .map(formatParam)
    .join(' ');

  // Mostrar en consola del navegador
  console[consoleMethod](`[DEBUG] ${formattedMessage}`);

  // Mostrar en la UI de debug (HTML)
  const debugConsole = document.getElementById('debugConsole');
  if (!debugConsole) return;

  const now = new Date().toLocaleTimeString();
  const msgElement = document.createElement('div');
  msgElement.innerHTML = `[${now}] ${formattedMessage}`;
  msgElement.style.color = logType.color;
  msgElement.style.margin = '2px 0';
  msgElement.style.padding = '2px 5px';

  // Mantener solo los últimos 10 logs visibles
  if (debugConsole.children.length >= MAX_LOGS) {
    debugConsole.removeChild(debugConsole.firstChild);
  }

  debugConsole.appendChild(msgElement);
  debugConsole.scrollTop = debugConsole.scrollHeight;
};

const createDebugUI = () => {
  if (!document.getElementById('toggleDebug')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleDebug';
    toggleBtn.textContent = APP_CONFIG.debugMode ? 'Debug ON' : 'Debug OFF';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '60px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.padding = '10px 15px';
    toggleBtn.style.backgroundColor = APP_CONFIG.debugMode
      ? '#4CAF50'
      : '#F44336';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '4px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '9999';
    document.body.appendChild(toggleBtn);

    if (!document.getElementById('debugConsole')) {
      const debugConsole = document.createElement('div');
      debugConsole.id = 'debugConsole';
      debugConsole.style.display = APP_CONFIG.debugMode ? 'block' : 'none';
      debugConsole.style.position = 'fixed';
      debugConsole.style.bottom = '0';
      debugConsole.style.left = '0';
      debugConsole.style.width = '100%';
      debugConsole.style.maxHeight = '200px';
      debugConsole.style.overflowY = 'scroll'; // Scroll para muchos logs
      debugConsole.style.backgroundColor = '#111';
      debugConsole.style.color = '#0f0';
      debugConsole.style.padding = '10px';
      debugConsole.style.fontFamily = 'monospace';
      debugConsole.style.zIndex = '9998';
      debugConsole.style.borderTop = '2px solid #333';
      document.body.appendChild(debugConsole);
    }

    toggleBtn.addEventListener('click', () => {
      APP_CONFIG.debugMode = !APP_CONFIG.debugMode;
      const debugConsole = document.getElementById('debugConsole');
      if (debugConsole) {
        debugConsole.style.display = APP_CONFIG.debugMode ? 'block' : 'none';
      }
      toggleBtn.textContent = APP_CONFIG.debugMode ? 'Debug ON' : 'Debug OFF';
      toggleBtn.style.backgroundColor = APP_CONFIG.debugMode
        ? '#4CAF50'
        : '#F44336';
      debugLog(
        `Debug ${APP_CONFIG.debugMode ? 'activado' : 'desactivado'}`,
        'info'
      );
    });
  }
};
const errorLogger = (message, error) => {
  console.error(`[ERROR] ${message}`, error);
  debugLog(`${message}: ${error.message}`, error.stack, 'error');
};

export { debugLog, createDebugUI, errorLogger };
