export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 400;
  res.status(status).json({ message: err.message || "Unexpected error" });
};
