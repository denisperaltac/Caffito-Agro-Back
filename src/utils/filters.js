import { Op } from "sequelize";

export const buildWhereClause = (filters) => {
  const where = {};

  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    if (value === null || value === undefined || value === "") {
      return;
    }

    // Filtros de fecha
    if (key.includes("fecha") || key.includes("Date")) {
      if (value.from && value.to) {
        where[key] = {
          [Op.between]: [new Date(value.from), new Date(value.to)],
        };
      } else if (value.from) {
        where[key] = {
          [Op.gte]: new Date(value.from),
        };
      } else if (value.to) {
        where[key] = {
          [Op.lte]: new Date(value.to),
        };
      }
    }
    // Filtros de texto (búsqueda parcial)
    else if (
      key.includes("nombre") ||
      key.includes("name") ||
      key.includes("proveedor")
    ) {
      where[key] = {
        [Op.iLike]: `%${value}%`,
      };
    }
    // Filtros de email
    else if (key.includes("email")) {
      where[key] = {
        [Op.iLike]: `%${value}%`,
      };
    }
    // Filtros numéricos
    else if (
      key.includes("precio") ||
      key.includes("kg") ||
      key.includes("ganancia")
    ) {
      if (
        typeof value === "object" &&
        value.min !== undefined &&
        value.max !== undefined
      ) {
        where[key] = {
          [Op.between]: [value.min, value.max],
        };
      } else if (value.min !== undefined) {
        where[key] = {
          [Op.gte]: value.min,
        };
      } else if (value.max !== undefined) {
        where[key] = {
          [Op.lte]: value.max,
        };
      } else {
        where[key] = value;
      }
    }
    // Filtros exactos
    else {
      where[key] = value;
    }
  });

  return where;
};

export const buildOrderClause = (sort) => {
  if (!sort) return [["createdAt", "DESC"]];

  const [field, direction = "ASC"] = sort.split(":");
  return [[field, direction.toUpperCase()]];
};
