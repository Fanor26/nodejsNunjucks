import { login } from '../../actions/authActions.js';
import { debugLog } from '../../debug.js';
import { navigateTo } from '../../router/index.js';

import { loadRoutes } from '../../services/loadRoutes.js';
import { store } from '../../store/index.js';

export default function Login() {
  let email = '';
  let password = '';

  const unsubscribe = store.subscribe(() => {
    const { auth } = store.getState();

    if (auth.isAuthenticated) {
      debugLog('Login exitoso (por suscripción), redirigiendo a /dashboard');

      // ✅ Llamar a función async fuera del subscribe
      handleSuccessfulLogin();

      unsubscribe(); // ✅ Nos desuscribimos
    } else if (auth.error) {
      debugLog('Error en login (por suscripción):', auth.error);
      alert(`Error de login: ${auth.error}`);
      unsubscribe(); // ✅ También desuscribimos en error
    }
  });

  // ✅ Esta sí es async fuera del subscribe
  const handleSuccessfulLogin = async () => {
    await loadRoutes(); // 🚀 Recargar rutas privadas
    await navigateTo('/dashboard'); // ✅ Redirigir
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor ingresa correo y contraseña');
      return;
    }

    debugLog('Intentando login con:', { email, password });

    // Llamar a la acción de login
    await store.dispatch(login({ email, password }));
    // Ya no necesitas getState aquí, lo hará la suscripción
  };

  return {
    type: 'card',
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '400px',
      maxWidth: '90%',
      margin: ' auto',
      padding: '2.5rem',
      backgroundColor: '#f7f9fa',
      borderRadius: '15px',
      border: '1px solid #ddd',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    children: [
      // {
      //   type: 'logo',
      //   src: '/assets/logo.png',
      //   alt: 'MiApp',
      //   styles: { width: '64px', height: '64px', margin: '0 auto 1.5rem' },
      // },
      {
        type: 'icon',
        name: 'login',
        size: '36px',
        styles: { color: '#4CAF50', margin: '0 auto 1rem' },
      },
      {
        type: 'text',
        content: 'Bienvenido de nuevo',
        styles: {
          fontSize: '1.75rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#222',
        },
      },
      {
        type: 'input',
        inputType: 'email',
        placeholder: 'Correo electrónico',
        styles: { marginBottom: '1rem', padding: '1rem', fontSize: '1rem' },
        // Usamos onInput para capturar cambios en tiempo real
        onInput: (e) => {
          email = e.target.value;
          debugLog('Email actualizado:', email);
        },
      },
      {
        type: 'input',
        inputType: 'password',
        placeholder: 'Contraseña',
        styles: { marginBottom: '1.5rem', padding: '1rem', fontSize: '1rem' },
        // Usamos onInput para capturar el valor de la contraseña
        onInput: (e) => {
          password = e.target.value;
          debugLog('Contraseña actualizada:', password);
        },
      },

      {
        type: 'button',
        label: 'Ingresar',
        styles: {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '4px',
          alignSelf: 'center',
          minWidth: '160px',
        },
        onClick: handleLogin,
      },
    ],
  };
}
