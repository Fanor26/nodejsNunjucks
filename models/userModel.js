import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido'],
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8,
    match: [/^\d+$/, 'El DNI debe ser numérico'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  nacionalidad: { type: String, required: true },
  ciudad: { type: String, required: true },
  active: { type: Boolean, default: true },

  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  cuentas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
});

const User = mongoose.model('User', userSchema);

const Admin = User.discriminator(
  'Admin',
  new mongoose.Schema({
    nivelAdministrador: {
      type: String,
      enum: ['bajo', 'medio', 'alto'],
      default: 'bajo',
    },
  })
);

const Director = User.discriminator(
  'Director',
  new mongoose.Schema({
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    especialidades: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' },
    ],
    horariosAtencion: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    ],
  })
);

const Doctor = User.discriminator(
  'Doctor',
  new mongoose.Schema({
    especialidades: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' },
    ],
    horarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    programacionCitas: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    ],
  })
);

const Paciente = User.discriminator(
  'Paciente',
  new mongoose.Schema({
    citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    historialClinico: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'HistoryClinic' },
    ],
  })
);

// ✅ Exportación nombrada
export { User, Admin, Director, Doctor, Paciente };
