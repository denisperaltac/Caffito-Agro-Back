import db from "../models/index.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createProducto = async (data) => db.Producto.create(data);
export const listProductos = async (options = {}) => {
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

  const { count, rows } = await db.Producto.findAndCountAll(queryOptions);
  
  return { data: rows, total: count };
};
export const getProducto = async (id) => {
  const entity = await db.Producto.findByPk(id);
  if (!entity) throw new Error("Producto not found");
  return entity;
};
export const updateProducto = async (id, data) => {
  const entity = await db.Producto.findByPk(id);
  if (!entity) throw new Error("Producto not found");
  await entity.update(data);
  return entity;
};
export const deleteProducto = async (id) => {
  const count = await db.Producto.destroy({ where: { id } });
  if (!count) throw new Error("Producto not found");
  return { id };
};