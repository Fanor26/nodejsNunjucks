import { createContext, useState, useContext } from 'react';

// 1️⃣ Crear contexto
const UserContext = createContext();

// 2️⃣ Proveedor de usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fake login con datos "mock"
  const login = ({ email, password }) => {
    if (email === 'fanor@example.com' && password === '123456') {
      setUser({ name: 'Fanor', email });
      return { success: true };
    } else {
      return { success: false, message: 'Credenciales incorrectas' };
    }
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 3️⃣ Hook personalizado
export const useUser = () => useContext(UserContext);
