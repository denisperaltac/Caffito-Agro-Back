import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTest = process.env.NODE_ENV === "test";

const databaseStorage =
  process.env.DB_STORAGE || path.join(__dirname, "../../data/database.sqlite");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? ":memory:" : databaseStorage,
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected and synced");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
