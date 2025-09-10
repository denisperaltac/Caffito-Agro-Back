import db from "../models/index.js";
import bcrypt from "bcrypt";
import { buildWhereClause, buildOrderClause } from "../utils/filters.js";

export const createUser = async ({ name, email, password, role }) => {
  const existing = await db.User.scope("withPassword").findOne({
    where: { email },
  });
  if (existing) throw new Error("Email already in use");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.User.create({ name, email, passwordHash, role });
  return user;
};

export const listUsers = async (options = {}) => {
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

  const { count, rows } = await db.User.findAndCountAll(queryOptions);

  return { data: rows, total: count };
};

export const getUserById = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id, data) => {
  const user = await db.User.scope("withPassword").findByPk(id);
  if (!user) throw new Error("User not found");
  const { name, email, password, role, isActive } = data;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  if (password) user.passwordHash = await bcrypt.hash(password, 10);
  await user.save();
  return db.User.findByPk(id);
};

export const deleteUser = async (id) => {
  const count = await db.User.destroy({ where: { id } });
  if (!count) throw new Error("User not found");
  return { id };
};
