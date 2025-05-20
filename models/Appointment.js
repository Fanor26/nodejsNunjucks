import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    horaInicio: {
      type: String, // ejemplo: '09:00'
      required: true,
    },
    horaFin: {
      type: String, // ejemplo: '09:30'
      required: true,
    },
    estado: {
      type: String,
      enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
      default: 'pendiente',
    },
    motivo: {
      type: String,
    },
    notasAdicionales: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
