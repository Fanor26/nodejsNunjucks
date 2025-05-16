import Clock from '../../components/ui/Clock.js';
import { Accounts } from './account.js';
import { Users } from './users/index.js';

export default function dashboard() {
  return {
    type: 'container',
    children: [
      // Clock(), // ✅ Ahora sí, llamas a Clock correctamente
      Users(),
    ],
  };
}
