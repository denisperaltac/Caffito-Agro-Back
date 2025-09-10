import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();
