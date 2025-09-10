import { Reproduccion } from "../db.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createReproduccion = async (data) => Reproduccion.create(data);
export const listReproduccions = async (options = {}) => {
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

  const { count, rows } = await Reproduccion.findAndCountAll(queryOptions);

  return { data: rows, total: count };
};
export const getReproduccion = async (id) => {
  const entity = await Reproduccion.findByPk(id);
  if (!entity) throw new Error("Reproduccion not found");
  return entity;
};
export const updateReproduccion = async (id, data) => {
  const entity = await Reproduccion.findByPk(id);
  if (!entity) throw new Error("Reproduccion not found");
  await entity.update(data);
  return entity;
};
export const deleteReproduccion = async (id) => {
  const count = await Reproduccion.destroy({ where: { id } });
  if (!count) throw new Error("Reproduccion not found");
  return { id };
};
