import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const createDatabase = async () => {
  try {
    console.log("Creating database if it doesn't exist...");

    // Connect to PostgreSQL server (without specifying database)
    const sequelize = new Sequelize(
      "postgres://postgres:Messiyyaco@localhost:5432/postgres",
      { logging: console.log }
    );

    await sequelize.authenticate();
    console.log("Connected to PostgreSQL server");

    // Create database if it doesn't exist
    const dbName =
      process.env.NODE_ENV === "test" ? "Caffito-Agro-Test" : "Caffito-Agro";

    try {
      await sequelize.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully!`);
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log(`ℹ️  Database "${dbName}" already exists`);
      } else {
        throw error;
      }
    }

    await sequelize.close();
    console.log("Database creation process completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating database:", error.message);
    process.exit(1);
  }
};

createDatabase();
