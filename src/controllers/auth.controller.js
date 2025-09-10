import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const result = await authService.login(email, password);

  res.json({
    message: "Login successful",
    ...result,
  });
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  const result = await authService.register({ name, email, password, role });

  res.status(201).json({
    message: "Registration successful",
    ...result,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  const result = await authService.refreshToken(refreshToken);

  res.json({
    message: "Token refreshed successfully",
    ...result,
  });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);

  res.json({ message: "Logout successful" });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    user: req.user,
  });
});
