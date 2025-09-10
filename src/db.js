import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = buildSequelize();

function buildSequelize() {
  switch (process.env.NODE_ENV) {
    case "production":
      return new Sequelize(
        process.env.CAFFITO_AGRO_DB,
        "postgres",
        process.env.DB_PASSWORD,
        {
          host: process.env.SERVER_CAFFITO_AGRO_DB,
          dialect: "postgres",
          logging: false,
          native: false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
    case "test":
      return new Sequelize(
        "postgres://postgres:Messiyyaco@localhost:5432/Caffito-Agro-Test",
        {
          logging: false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
    default:
      return new Sequelize(
        "postgres://postgres:Messiyyaco@localhost:5432/Caffito-Agro",
        {
          logging: process.env.DB_LOGGING === "true" ? console.log : false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
  }
}

const basename = path.basename(__filename);
const modelDefiners = [];

// Importar todos los modelos dinámicamente
const modelFiles = fs
  .readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

// Importar cada modelo y ejecutar su función de inicialización
for (const file of modelFiles) {
  const modelPath = path.join(__dirname, "/models", file);
  const modelModule = await import(`file://${modelPath}`);

  // Buscar la función de inicialización del modelo
  const initFunction =
    modelModule.initUserModel ||
    modelModule.initAnimalModel ||
    modelModule.initPesoModel ||
    modelModule.initProductoModel ||
    modelModule.initDietaModel ||
    modelModule.initSanidadModel ||
    modelModule.initReproduccionModel ||
    modelModule.initHistorialDietaModel ||
    modelModule.initCorralModel;

  if (initFunction) {
    initFunction(sequelize);
  }
}

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Función para conectar y sincronizar la base de datos
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

// Función para cerrar la conexión
const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error);
    throw error;
  }
};

export { sequelize, connectDatabase, closeDatabase };

// Exportar todos los modelos
export const {
  User,
  Animal,
  Peso,
  Producto,
  Dieta,
  Sanidad,
  Reproduccion,
  HistorialDieta,
  Corral,
} = sequelize.models;
