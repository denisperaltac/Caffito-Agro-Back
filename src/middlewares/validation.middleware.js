export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      errors: {
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      },
    });
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
      errors: { email: "Please provide a valid email address" },
    });
  }

  // Validación básica de password
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password too short",
      errors: { password: "Password must be at least 6 characters long" },
    });
  }

  next();
};

export const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please provide a valid email address";
    }
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (role && !["admin", "user"].includes(role)) {
    errors.role = "Role must be either 'admin' or 'user'";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};
