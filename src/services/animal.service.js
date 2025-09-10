import { Animal, Dieta, Corral } from "../db.js";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createAnimal = async (data) => {
  return Animal.create(data);
};

export const listAnimals = async (options = {}) => {
  const { pagination, filters, sort } = options;

  const where = buildWhereClause(filters || {});
  const order = buildOrderClause(sort);

  const queryOptions = {
    where,
    order,
    include: [
      { model: Dieta, as: "Dieta" },
      { model: Corral, as: "Corral" },
    ],
  };

  if (pagination) {
    queryOptions.limit = pagination.limit;
    queryOptions.offset = pagination.offset;
  }

  const { count, rows } = await Animal.findAndCountAll(queryOptions);

  return { data: rows, total: count };
};

export const getAnimalByRp = async (rp) => {
  const animal = await Animal.findByPk(rp);
  if (!animal) throw new Error("Animal not found");
  return animal;
};

export const updateAnimal = async (rp, data) => {
  const animal = await Animal.findByPk(rp);
  if (!animal) throw new Error("Animal not found");
  await animal.update(data);
  return animal;
};

export const deleteAnimal = async (rp) => {
  const count = await Animal.destroy({ where: { rp } });
  if (!count) throw new Error("Animal not found");
  return { rp };
};
