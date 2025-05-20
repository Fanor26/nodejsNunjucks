import Account from '../models/accountModel.js';
import User from '../models/userModel.js';

const cleanOrphaned = async () => {
  try {
    console.log('Iniciando limpieza de cuentas huérfanas...');

    // Paso 1: Obtener todos los usuarios existentes
    const existingUsers = await User.find().select('_id');
    console.log(`Usuarios existentes encontrados: ${existingUsers.length}`);

    // Paso 2: Crear un Set con los ObjectIds de los usuarios existentes
    const existingUserIds = new Set(
      existingUsers.map((user) => user._id.toString())
    );

    // Paso 3: Obtener todas las cuentas con un campo 'user' asociado
    const allAccounts = await Account.find({ user: { $exists: true } });
    console.log(`Total de cuentas a verificar: ${allAccounts.length}`);

    // Paso 4: Iterar sobre todas las cuentas y eliminar aquellas cuyo 'user' no exista en 'User'
    for (const account of allAccounts) {
      if (!existingUserIds.has(account.user.toString())) {
        console.log(`Cuenta huérfana encontrada: ${account._id}`);
        await Account.deleteOne({ _id: account._id }); // Eliminar la cuenta huérfana
        console.log(`Cuenta huérfana eliminada: ${account._id}`);
      }
    }

    console.log('Proceso de limpieza completado.');
  } catch (error) {
    console.error('Error al limpiar las cuentas huérfanas:', error);
  }
};

export default cleanOrphaned;
