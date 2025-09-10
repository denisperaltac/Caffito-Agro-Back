import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createSanidad = async (data) => db.Sanidad.create(data);
export const listSanidads = async (options = {}) => {
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

  const { count, rows } = await db.Sanidad.findAndCountAll(queryOptions);
  
  return { data: rows, total: count };
};
export const getSanidad = async (id) => {
  const entity = await db.Sanidad.findByPk(id);
  if (!entity) throw new Error("Sanidad not found");
  return entity;
};
export const updateSanidad = async (id, data) => {
  const entity = await db.Sanidad.findByPk(id);
  if (!entity) throw new Error("Sanidad not found");
  await entity.update(data);
  return entity;
};
export const deleteSanidad = async (id) => {
  const count = await db.Sanidad.destroy({ where: { id } });
  if (!count) throw new Error("Sanidad not found");
  return { id };
};