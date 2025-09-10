import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createDieta = async (data) => db.Dieta.create(data);
export const listDietas = async (options = {}) => {
  const { pagination, filters, sort } = options;
  
  const where = buildWhereClause(filters || {});
  const order = buildOrderClause(sort);
  
  const queryOptions = {
    where,
    order,
  };

  if (pagination) {
    queryOptions.limit = pagination.limit;
    queryOptions.offset = pagination.offset;
  }

  const { count, rows } = await db.Dieta.findAndCountAll(queryOptions);
  
  return { data: rows, total: count };
};
export const getDieta = async (id) => {
  const entity = await db.Dieta.findByPk(id);
  if (!entity) throw new Error("Dieta not found");
  return entity;
};
export const updateDieta = async (id, data) => {
  const entity = await db.Dieta.findByPk(id);
  if (!entity) throw new Error("Dieta not found");
  await entity.update(data);
  return entity;
};
export const deleteDieta = async (id) => {
  const count = await db.Dieta.destroy({ where: { id } });
  if (!count) throw new Error("Dieta not found");
  return { id };
};