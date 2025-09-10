import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

export const generateTokens = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const login = async (email, password) => {
  const user = await db.User.scope("withPassword").findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isActive) {
    throw new Error("Account is inactive");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const tokens = generateTokens(user);

  // Actualizar refresh token en la base de datos
  await user.update({ refreshToken: tokens.refreshToken });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
};

export const register = async (userData) => {
  const { name, email, password, role = "user" } = userData;

  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.User.create({
    name,
    email,
    passwordHash,
    role,
  });

  const tokens = generateTokens(user);

  // Guardar refresh token
  await user.update({ refreshToken: tokens.refreshToken });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
};

export const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const user = await db.User.scope("withPassword").findByPk(decoded.userId);

    if (!user || user.refreshToken !== refreshToken || !user.isActive) {
      throw new Error("Invalid refresh token");
    }

    const tokens = generateTokens(user);

    // Actualizar refresh token
    await user.update({ refreshToken: tokens.refreshToken });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const logout = async (userId) => {
  await db.User.update({ refreshToken: null }, { where: { id: userId } });
};
