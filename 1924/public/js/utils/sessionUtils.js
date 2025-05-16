import { store } from '../store/index.js'; // Asegúrate de exportar el store correctamente

// ✅ Función para manejar la expiración
function sessionExpired() {
  console.log('⏰ La sesión ha expirado.');

  // Despachar acción a Redux
  store.dispatch(sessionExpired());

  // Redirigir al login
  window.location.href = '/login';
}

// ✅ Obtener el tiempo restante de la sesión desde el backend
async function getSessionTime() {
  try {
    const response = await fetch('/session-time', {
      method: 'GET',
      credentials: 'include', // Envía la cookie de sesión
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('⚠️ Error al obtener el tiempo de sesión:', response.status);
      return null;
    }

    const data = await response.json();
    return data.remainingSessionTime
      ? Math.floor(data.remainingSessionTime / 1000)
      : null;
  } catch (error) {
    console.error('❌ Error al obtener el tiempo de sesión:', error);
    return null;
  }
}

// ✅ Maneja el conteo regresivo de la sesión
function handleSessionExpiration(remainingSeconds) {
  const countdownInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      updateSessionTimeDisplay(hours, minutes, seconds);
      remainingSeconds--;
    } else {
      sessionExpired();
      clearInterval(countdownInterval);
    }
  }, 1000);
}

// ✅ Muestra el tiempo de sesión en pantalla
function updateSessionTimeDisplay(hours, minutes, seconds) {
  const sessionTimeElement = document.getElementById('sessionTime');
  if (sessionTimeElement) {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    sessionTimeElement.textContent = `Tiempo de sesión: ${formattedTime}`;
  }
}

// ✅ Inicializa la gestión de sesión
export async function initSessionManagement() {
  const remainingSessionTime = await getSessionTime();
  if (remainingSessionTime) {
    handleSessionExpiration(remainingSessionTime);
  } else {
    console.log('ℹ️ No hay sesión activa.');
  }
}
