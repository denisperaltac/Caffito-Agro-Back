import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createCorral = async (data) => db.Corral.create(data);
export const listCorrals = async (options = {}) => {
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

  const { count, rows } = await db.Corral.findAndCountAll(queryOptions);
  
  return { data: rows, total: count };
};
export const getCorral = async (id) => {
  const entity = await db.Corral.findByPk(id);
  if (!entity) throw new Error("Corral not found");
  return entity;
};
export const updateCorral = async (id, data) => {
  const entity = await db.Corral.findByPk(id);
  if (!entity) throw new Error("Corral not found");
  await entity.update(data);
  return entity;
};
export const deleteCorral = async (id) => {
  const count = await db.Corral.destroy({ where: { id } });
  if (!count) throw new Error("Corral not found");
  return { id };
};