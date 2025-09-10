export const filtersMiddleware = (req, res, next) => {
  const filters = {};
  const sort = req.query.sort;

  // Extraer filtros de query parameters
  Object.keys(req.query).forEach((key) => {
    if (key === "page" || key === "limit" || key === "sort") {
      return; // Skip pagination and sort params
    }

    const value = req.query[key];

    // Manejar rangos de fecha
    if (key.includes("fecha") || key.includes("Date")) {
      if (value.includes(",")) {
        const [from, to] = value.split(",");
        filters[key] = { from, to };
      } else {
        filters[key] = { from: value };
      }
    }
    // Manejar rangos numéricos
    else if (
      key.includes("precio") ||
      key.includes("kg") ||
      key.includes("ganancia")
    ) {
      if (value.includes(",")) {
        const [min, max] = value.split(",");
        filters[key] = { min: parseFloat(min), max: parseFloat(max) };
      } else {
        filters[key] = parseFloat(value);
      }
    }
    // Valores simples
    else {
      filters[key] = value;
    }
  });

  req.filters = filters;
  req.sort = sort;

  next();
};
