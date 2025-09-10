import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createPeso = async (data) => db.Peso.create(data);
export const listPesos = async (options = {}) => {
  const { pagination, filters, sort } = options;

  const where = buildWhereClause(filters || {});
  const order = buildOrderClause(sort);

  const queryOptions = {
    where,
    order,
    include: [{ model: db.Animal, as: "Animal" }],
  };

  if (pagination) {
    queryOptions.limit = pagination.limit;
    queryOptions.offset = pagination.offset;
  }

  const { count, rows } = await db.Peso.findAndCountAll(queryOptions);

  return { data: rows, total: count };
};
export const getPeso = async (id) => {
  const entity = await db.Peso.findByPk(id);
  if (!entity) throw new Error("Peso not found");
  return entity;
};
export const updatePeso = async (id, data) => {
  const entity = await db.Peso.findByPk(id);
  if (!entity) throw new Error("Peso not found");
  await entity.update(data);
  return entity;
};
export const deletePeso = async (id) => {
  const count = await db.Peso.destroy({ where: { id } });
  if (!count) throw new Error("Peso not found");
  return { id };
};
