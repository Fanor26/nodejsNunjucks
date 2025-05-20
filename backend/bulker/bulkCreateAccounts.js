import mongoose from 'mongoose';
import Account from '../models/accountModel.js'; // Modelo Account
import { User } from '../models/userModel.js'; // Modelo User
import connectDB from './database.js'; // Conexión a la base de datos

const generateAccounts = async (numAccounts) => {
  const emailProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
  ];
  const accounts = [];

  // Obtener todos los usuarios
  const users = await User.find();
  if (users.length === 0) {
    console.log('❌ No se encontraron usuarios para asociar las cuentas.');
    return accounts;
  }

  for (let i = 1; i <= numAccounts; i++) {
    const userIndex = i % users.length;
    const user = users[userIndex];

    // Evitar crear múltiples cuentas para el mismo usuario si ya tiene al menos una
    if (user.cuentas.length > 0) {
      console.log(`⚠️ Usuario ${user.nombre} ya tiene cuentas. Saltando...`);
      continue;
    }

    const baseEmail = `user${i}`;
    const domain = emailProviders[i % emailProviders.length];
    let email = `${baseEmail}@${domain}`;

    // Evitar duplicados: generar nuevo email si ya existe
    let counter = 1;
    while (await Account.findOne({ email })) {
      email = `${baseEmail}_${counter}@${domain}`;
      counter++;
    }

    try {
      const newAccount = new Account({
        email,
        contraseña: 'password123',
        user: user._id,
      });

      await newAccount.save();

      // Asociar cuenta al usuario
      user.cuentas.push(newAccount._id);
      await user.save();

      accounts.push(newAccount);
      console.log(`✅ Cuenta creada: ${email} para usuario ${user.nombre}`);
    } catch (error) {
      console.error(
        `❌ Error al crear cuenta para ${user.nombre}:`,
        error.message
      );
    }
  }

  return accounts;
};

const bulkCreateAccounts = async () => {
  try {
    await connectDB();
    console.log('✅ Conectado a MongoDB');

    const accounts = await generateAccounts(50); // Cambia el número si deseas más/menos

    console.log(`🎉 Se crearon ${accounts.length} cuentas nuevas.`);
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error en la operación bulkCreateAccounts:', error);
    mongoose.connection.close();
  }
};

bulkCreateAccounts();
