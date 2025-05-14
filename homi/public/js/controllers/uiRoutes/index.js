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
  '/home': home,
  '/about': about,
  '/login': loginController,
  '/register': RegisterController,
  '/dashboard': dashboard,
  '/dashboard/profile': dashboardProfile,
  '/home/specialties': Specialty,
  '/home/specialties/dental': Dental,
  '/home/specialties/medical': SpecialtyMedical,
  '/home/specialties/medical/adiology': Radiology,
};
