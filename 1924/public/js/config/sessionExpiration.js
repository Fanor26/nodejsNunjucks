// utils/sessionExpiration.js

/**
 * Función para eliminar una cookie por su nombre.
 * @param {string} name - Nombre de la cookie.
 */
function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/'; // Eliminar la cookie
}

/**
 * Función para manejar la expiración de la sesión.
 * @param {number} remainingSessionTime - Tiempo restante de la sesión en milisegundos.
 */
export function handleSessionExpiration(remainingSessionTime) {
  if (remainingSessionTime) {
    let remainingSeconds = Math.floor(remainingSessionTime / 1000); // Tiempo restante en segundos
    let remainingMinutes = Math.floor(remainingSeconds / 60); // Convertir a minutos
    let remainingSecs = remainingSeconds % 60; // Obtener los segundos restantes

    // Mostrar el tiempo restante en la consola de manera más legible
    console.log(
      `Tiempo restante: ${remainingMinutes} minutos y ${remainingSecs} segundos`
    );

    // Mostrar el tiempo restante en el HTML
    const sessionTimeElement = document.getElementById('sessionTime');
    if (sessionTimeElement) {
      sessionTimeElement.textContent = `Tiempo restante de la sesión: ${remainingMinutes} minutos y ${remainingSecs} segundos`;
    }

    // Crear un intervalo para actualizar el tiempo en el frontend
    const countdownInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        // Actualizar los minutos y segundos
        remainingSeconds--;
        remainingMinutes = Math.floor(remainingSeconds / 60);
        remainingSecs = remainingSeconds % 60;

        // Mostrar el tiempo restante actualizado en la consola
        console.log(
          `Tiempo restante: ${remainingMinutes} minutos y ${remainingSecs} segundos`
        );

        // Actualizar el contenido en el HTML
        if (sessionTimeElement) {
          sessionTimeElement.textContent = `Tiempo restante de la sesión: ${remainingMinutes} minutos y ${remainingSecs} segundos`;
        }
      } else {
        // La sesión ha expirado, eliminamos el token de localStorage y cookies
        if (sessionTimeElement) {
          sessionTimeElement.textContent = 'La sesión ha expirado.';
        }
        console.log('La sesión ha expirado.');

        // Eliminar el token de localStorage
        if (localStorage.getItem('jwt')) {
          localStorage.removeItem('jwt'); // Eliminar token de localStorage
          console.log('Token eliminado de localStorage');
        }

        // Eliminar el token de las cookies
        deleteCookie('jwt'); // Eliminar token de cookies
        console.log('Token eliminado de cookies');

        // Redirigir al login después de la expiración
        window.location.href = '/login'; // Redirige al login
        clearInterval(countdownInterval); // Detener el intervalo
      }
    }, 1000);
  }
}
