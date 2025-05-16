// config/modelsMap.js
import {
  User,
  Doctor,
  Admin,
  Director,
  Paciente,
} from '../models/userModel.js';
import Account from '../models/accountModel.js';
import Role from '../models/roleModel.js';
import Permission from '../models/permissionModel.js';
import Specialty from '../models/specialtyModel.js';
import Service from '../models/serviceModel.js';
import Schedule from '../models/scheduleModel.js';
import Appointment from '../models/Appointment.js';
import HistoryClinic from '../models/HistoryClinic.js';

export const modelsMap = {
  User,
  Doctor,
  Admin,
  Director,
  Paciente,
  Account,
  Role,
  Permission,
  Specialty,
  Service,
  Schedule,
  Appointment,
  HistoryClinic,
};

export const refMap = {
  User: [['roles', 'permisos']],
  Doctor: [
    ['roles', 'permisos'],
    'cuentas',
    'especialidades',
    'horarios',
    'programacionCitas',
  ],
  Admin: [['roles', 'permisos'], 'cuentas'],
  Director: [
    ['roles', 'permisos'],
    'cuentas',
    'servicios',
    'especialidades',
    'horariosAtencion',
  ],
  Paciente: [['roles', 'permisos'], 'cuentas', 'citas', 'historialClinico'],
  Account: [
    {
      path: 'user',
      populate: [
        {
          path: 'roles',
          populate: { path: 'permisos' },
        },
      ],
    },
  ],
  Specialty: ['servicios'],
  Role: ['permisos'],
};
