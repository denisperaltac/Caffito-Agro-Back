import dotenv from "dotenv";
import { connectDatabase, sequelize } from "../db.js";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("Testing database connection...");
    console.log("Environment:", process.env.NODE_ENV || "development");

    await connectDatabase();

    // Test a simple query
    const result = await sequelize.query("SELECT NOW() as current_time");
    console.log("Database query test successful:", result[0][0]);

    console.log("✅ Database connection test passed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection test failed:", error.message);
    process.exit(1);
  }
};

testConnection();
