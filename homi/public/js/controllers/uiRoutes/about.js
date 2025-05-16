import Calculator from '../../components/ui/Calculator.js';
import Clock from '../../components/ui/Clock.js';
import Roulette from '../../components/ui/Roulette.js';
import Landmark from '../../components/ui/Landmark.js';
export default function About() {
  return {
    type: 'container',
    children: [
      Calculator(), // ✅ Solo llamas tu componente elegante
      Clock(), // ✅ Calculadora modular
      Landmark(),
      Roulette(),
    ],
  };
}
