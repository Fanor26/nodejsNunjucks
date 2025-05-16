import { debugLog } from '../debug.js';
import { store } from '../store/index.js';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  CHECK_SESSION,
} from '../store/types/authTypes.js';

// 🔒 LOGIN ACTION
export const login = async (credentials) => {
  const dispatch = store.dispatch;

  debugLog('Iniciando acción de login con credenciales:', {
    email: credentials.email,
    password: '********', // No loguees contraseñas
  });

  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch(
      'https://15000-fanor26-nodejsnunjucks-12s16nkk8mb.ws-us118.gitpod.io/auth/login',
      {
        method: 'POST',
        credentials: 'include', // 🔴 sin esto NO se envía ni recibe la cookie connect.sid
        headers: {
          'Content-Type': 'application/json',
        },
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      debugLog('Error de login, el servidor respondió con:', errorData);
      throw new Error(errorData.message || 'Error en autenticación');
    }

    const data = await response.json();
    debugLog('Login exitoso, datos recibidos:', data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: data.data.user,
        session: data.data.session,
      },
    });
  } catch (error) {
    debugLog('Error en el login:', error.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// 📝 REGISTER ACTION
export const register = async (userData) => {
  const dispatch = store.dispatch;
  debugLog('Iniciando acción de registro con datos:', userData);

  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      debugLog('Error de registro, el servidor respondió con:', errorData);
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();
    debugLog('Registro exitoso, datos recibidos:', data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        user: data.data.user,
        session: data.data.session,
      },
    });
  } catch (error) {
    debugLog('Error en el registro:', error.message);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

// 🔎 CHECK SESSION ACTION
export const checkSession = async () => {
  const dispatch = store.dispatch;
  try {
    const response = await fetch('/auth/me', {
      credentials: 'include',
    });
    debugLog('checkSession response status:', response.status);

    if (response.status === 401) {
      debugLog('session invalid, dispatching null');
      return dispatch({ type: CHECK_SESSION, payload: null });
    }

    const data = await response.json();
    debugLog('checkSession data:', data);

    dispatch({
      type: CHECK_SESSION,
      payload: {
        user: data.data?.user,

        session: data.data?.session,
      },
    });
  } catch (error) {
    debugLog('checkSession error:', error);
    console.error('Error verificando sesión:', error);
  }
};

export const logout = async () => {
  const dispatch = store.dispatch;
  debugLog('Acción de logout llamada');

  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    debugLog('Respuesta de logout, estado:', response.status);

    dispatch({ type: LOGOUT });
  } catch (error) {
    debugLog('Error al hacer logout:', error.message);
    console.error('Error al cerrar sesión:', error);
  }
};
