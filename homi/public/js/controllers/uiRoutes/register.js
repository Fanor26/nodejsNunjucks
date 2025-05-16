import { register } from '../../actions/authActions.js';
import { debugLog } from '../../debug.js';
import { handleRouteChange } from '../../router/routerSingle.js';
import { store } from '../../store/index.js';

export default function registerController() {
  let username = '';
  let email = '';
  let dni = '';
  let password = '';
  let confirmPassword = '';

  const handleRegister = async () => {
    debugLog('🟢 handleRegister llamado con valores:', {
      username,
      email,
      dni,
      password,
      confirmPassword,
    });

    if (!username || !email || !dni || !password || !confirmPassword) {
      debugLog('❗ Campos vacíos detectados', {
        username,
        email,
        dni,
        password,
        confirmPassword,
      });
      alert('Por favor ingresa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      debugLog('❌ Las contraseñas no coinciden', {
        password,
        confirmPassword,
      });
      alert('Las contraseñas no coinciden');
      return;
    }

    debugLog('📤 Enviando datos para registro:', {
      username,
      email,
      dni,
      password,
      confirmPassword,
    });

    // Suscribirse para detectar cuando Redux actualiza el estado
    const unsubscribe = store.subscribe(() => {
      const { auth } = store.getState();

      if (auth.isAuthenticated) {
        debugLog('✅ Registro exitoso, redirigiendo a /dashboard');
        handleRouteChange('/dashboard'); // 🔥 Aquí se hace bien la redirección + refresh visual
        unsubscribe();
      } else if (auth.error) {
        debugLog('❗ Error en registro', auth.error);
        alert(`Error de registro: ${auth.error}`);
        unsubscribe();
      }
    });

    // Ejecutar el dispatch
    await store.dispatch(
      register({ username, email, dni, password, confirmPassword })
    );
  };

  return {
    type: 'card',
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '400px',
      maxWidth: '90%',
      margin: '5rem auto',
      padding: '2.5rem',
      backgroundColor: '#f7f9fa',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    children: [
      {
        type: 'logo',
        src: '/assets/logo.png',
        alt: 'MiApp',
        styles: { width: '64px', height: '64px', margin: '0 auto 1.5rem' },
      },
      {
        type: 'text',
        content: 'Crea tu cuenta',
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
        inputType: 'text',
        placeholder: 'Nombre de usuario',
        styles: { marginBottom: '1rem', padding: '1rem', fontSize: '1rem' },
        onInput: (e) => {
          const value = e.target.value;
          debugLog('📝 username actualizado:', value);
          username = value;
        },
      },
      {
        type: 'input',
        inputType: 'email',
        placeholder: 'Correo electrónico',
        styles: { marginBottom: '1rem', padding: '1rem', fontSize: '1rem' },
        onInput: (e) => {
          const value = e.target.value;
          debugLog('📧 email actualizado:', value);
          email = value;
        },
      },
      {
        type: 'input',
        inputType: 'text',
        placeholder: 'DNI',
        styles: { marginBottom: '1rem', padding: '1rem', fontSize: '1rem' },
        onInput: (e) => {
          const value = e.target.value;
          debugLog('🪪 dni actualizado:', value);
          dni = value;
        },
      },
      {
        type: 'input',
        inputType: 'password',
        placeholder: 'Contraseña',
        styles: { marginBottom: '1.5rem', padding: '1rem', fontSize: '1rem' },
        onInput: (e) => {
          const value = e.target.value;
          debugLog('🔑 password actualizado:', value);
          password = value;
        },
      },
      {
        type: 'input',
        inputType: 'password',
        placeholder: 'Confirmar Contraseña',
        styles: { marginBottom: '1.5rem', padding: '1rem', fontSize: '1rem' },
        onInput: (e) => {
          const value = e.target.value;
          debugLog('🔒 confirmPassword actualizado:', value);
          confirmPassword = value;
        },
      },
      {
        type: 'button',
        label: 'Registrar',
        styles: {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '4px',
          alignSelf: 'center',
          minWidth: '160px',
        },
        onClick: handleRegister,
      },
    ],
  };
}
// controllers/uiRoutes/register

// import { debugLog } from '../../debug.js';
// import { withHooks, useState, useEffect } from '../../hooks/index.js';

// export const RegisterController = withHooks(() => {
//   const [count, setCount] = useState(0);
//   const [clicksHistory, setClicksHistory] = useState([]);

//   // Efecto para actualizar el DOM cuando cambia el contador
//   useEffect(() => {
//     const counterTextElement = document.querySelector('.counter-text');
//     if (counterTextElement) {
//       counterTextElement.textContent = `Clicks: ${count}`;
//     }
//   }, [count]);

//   // Efecto para debuggear cuando cambia el historial
//   useEffect(() => {
//     debugLog('Historial actualizado:', clicksHistory);
//   }, [clicksHistory]);

//   const handleClick = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     setClicksHistory((prev) => [...prev, newCount]);
//   };

//   const handleReset = () => {
//     setCount(0);
//     setClicksHistory([]);
//   };

//   return {
//     type: 'container',
//     styles: {
//       padding: '20px',
//       backgroundColor: '#2c3e50',
//       borderRadius: '8px',
//       color: 'white',
//     },
//     children: [
//       {
//         type: 'text',
//         className: 'counter-text',
//         content: `Clicks: ${count}`,
//         styles: { fontSize: '1.2rem', marginBottom: '15px' },
//       },
//       {
//         type: 'button',
//         className: 'click-button',
//         label: 'Haz clic',
//         styles: {
//           padding: '10px 20px',
//           backgroundColor: '#3498db',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           marginRight: '10px',
//         },
//         onClick: handleClick,
//       },
//       {
//         type: 'button',
//         className: 'reset-button',
//         label: 'Reiniciar',
//         styles: {
//           padding: '10px 20px',
//           backgroundColor: '#e74c3c',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//         },
//         onClick: handleReset,
//       },
//       {
//         type: 'container',
//         styles: { marginTop: '20px' },
//         children: [
//           {
//             type: 'text',
//             content: 'Historial:',
//             styles: { fontSize: '1rem', marginBottom: '5px' },
//           },
//           {
//             type: 'list',
//             items: clicksHistory.slice().reverse(),
//             limit: 5,
//             styles: { maxHeight: '100px', overflowY: 'auto' },
//           },
//         ],
//       },
//     ],
//   };
// });

// export default RegisterController();
