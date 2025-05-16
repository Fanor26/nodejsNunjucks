export function setupWebSocket() {
  const socket = new WebSocket(`wss://${window.location.host}`);

  socket.onmessage = function (event) {
    if (event.data === 'reload') {
      console.log('🔄 Recargando la página...');
      window.location.reload();
    }
  };

  socket.onopen = function () {
    console.log('✅ Conectado al WebSocket');
  };

  socket.onerror = function (error) {
    console.error('❌ Error en WebSocket:', error);
  };

  socket.onclose = function () {
    console.warn('⚠️ Conexión WebSocket cerrada, intentando reconectar...');
    setTimeout(() => window.location.reload(), 3000);
  };
}
