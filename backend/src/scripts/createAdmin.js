import { Usuario } from "../models/Usuario.js";
import { sequelize } from "../database/sequelize.js";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    // Verificar si ya existe un admin
    const existingAdmin = await Usuario.findOne({ 
      where: { tipoUsuario: "administrador" } 
    });

    if (existingAdmin) {
      console.log("Ya existe un administrador:", existingAdmin.email);
      
      // Si el admin existe pero está inactivo, reactivarlo
      if (!existingAdmin.activo) {
        await existingAdmin.update({ activo: true });
        console.log("Administrador reactivado exitosamente");
      }
      
      return;
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Crear administrador
    const admin = await Usuario.create({
      nombreUsuario: "Administrador",
      email: "admin@utndemy.com",
      contrasena: hashedPassword,
      tipoUsuario: "administrador",
      fotoDePerfil: "/Default",
      activo: true,
    });

    console.log("Administrador creado exitosamente:");
    console.log("Email:", admin.email);
    console.log("Contraseña: admin123");
    
  } catch (error) {
    console.error("Error al crear administrador:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

createAdmin();