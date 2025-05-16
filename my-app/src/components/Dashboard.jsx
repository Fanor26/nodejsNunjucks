import { useUser } from '../context/userContext';

export default function Dashboard() {
  const { user, logout } = useUser();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Bienvenido, {user.name} ({user.email})
      </p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
