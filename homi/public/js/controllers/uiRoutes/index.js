import home from './home.js';
import about from './about.js';
import dashboard from './dashboard.js';
import dashboardProfile from './profile.js';
import Specialty from './specialty.js';
import SpecialtyMedical from './medical.js';
import loginController from './login.js';
import RegisterController from './register.js';
import Dental from './dental.js';
import Radiology from './radiology.js';

export const routeControllers = {
  Inicio: home,
  'Sobre Nosotros': about,
  'Iniciar Sesión': loginController,
  Registrarse: RegisterController,
  Dashboard: dashboard,
  perfi: dashboardProfile,
  Especialidades: Specialty,
  Dental: Dental,
  Medical: SpecialtyMedical,
  Radiología: Radiology,
};
