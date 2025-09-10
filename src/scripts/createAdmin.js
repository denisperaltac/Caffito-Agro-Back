import dotenv from "dotenv";
import { connectDatabase } from "../db.js";
import * as authService from "../services/auth.service.js";

dotenv.config();

const createAdminUser = async () => {
  try {
    await connectDatabase();

    const adminData = {
      name: "Admin",
      email: "admin@caffitoagro.com",
      password: "admin123",
      role: "admin",
    };

    try {
      const result = await authService.register(adminData);
      console.log("✅ Admin user created successfully!");
      console.log("📧 Email:", result.user.email);
      console.log("🔑 Access Token:", result.accessToken);
      console.log("🔄 Refresh Token:", result.refreshToken);
    } catch (error) {
      if (error.message === "Email already registered") {
        console.log("ℹ️  Admin user already exists");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdminUser();
