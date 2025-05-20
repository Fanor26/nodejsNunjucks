import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  alias: { type: String, required: true },
  descripcion: { type: String },
  permisos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

export default mongoose.model('Role', RoleSchema);
