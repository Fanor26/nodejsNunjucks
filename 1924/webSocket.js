// websocket.js
const WebSocket = require('ws');
const chokidar = require('chokidar');

// Función para inicializar WebSocket
function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  // Manejar conexiones WebSocket
  wss.on('connection', (ws) => {
    console.log('🔗 Cliente WebSocket conectado');
    ws.send('Conexión establecida con WebSocket');
  });

  // Monitorear cambios en archivos y notificar a WebSocket
  chokidar
    .watch(['./views/**/*.njk', './public/js/**/*.js', './public/css/**/*.css'])
    .on('change', (file) => {
      console.log(`📝 Archivo cambiado: ${file}`);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('reload');
        }
      });
    });

  return wss;
}

module.exports = setupWebSocket;
