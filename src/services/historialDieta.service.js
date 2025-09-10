import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createHistorialDieta = async (data) => db.HistorialDieta.create(data);
export const listHistorialDietas = async (options = {}) => {
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

  const { count, rows } = await db.HistorialDieta.findAndCountAll(queryOptions);
  
  return { data: rows, total: count };
};
export const getHistorialDieta = async (id) => {
  const entity = await db.HistorialDieta.findByPk(id);
  if (!entity) throw new Error("HistorialDieta not found");
  return entity;
};
export const updateHistorialDieta = async (id, data) => {
  const entity = await db.HistorialDieta.findByPk(id);
  if (!entity) throw new Error("HistorialDieta not found");
  await entity.update(data);
  return entity;
};
export const deleteHistorialDieta = async (id) => {
  const count = await db.HistorialDieta.destroy({ where: { id } });
  if (!count) throw new Error("HistorialDieta not found");
  return { id };
};