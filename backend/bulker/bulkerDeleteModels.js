import mongoose from 'mongoose';
import connectDB from './database.js'; // Importa la función connectDB

// Función para eliminar todos los documentos de varios modelos
const bulkDeleteModels = async (models) => {
  try {
    await connectDB(); // Establecer la conexión a la base de datos

    // Recorrer cada modelo en el array y eliminar todos sus documentos
    for (const model of models) {
      const result = await model.deleteMany({}); // Eliminar todos los documentos
      console.log(
        `Se eliminaron ${result.deletedCount} documentos de ${model.modelName}.`
      );
    }

    // Cerrar la conexión de Mongoose
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al eliminar documentos:', error);
    mongoose.connection.close();
  }
};

// Ejemplo de uso
import { User, Director, Paciente } from '../models/userModel.js'; // Importar el modelo User
import permissionModel from '../models/permissionModel.js';
import Account from '../models/accountModel.js'; // Modelo Account
const modelsToDelete = [Account]; // Array de modelos a limpiar

bulkDeleteModels(modelsToDelete); // Llamar a la función para eliminar documentos
