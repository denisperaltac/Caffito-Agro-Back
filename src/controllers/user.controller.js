import * as userService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildPaginationResponse } from "../middlewares/pagination.middleware.js";

export const create = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

export const list = asyncHandler(async (req, res) => {
  const { pagination, filters, sort } = req;
  const result = await userService.listUsers({ pagination, filters, sort });

  if (pagination) {
    const response = buildPaginationResponse(
      result.data,
      pagination,
      result.total
    );
    res.json(response);
  } else {
    res.json(result.data);
  }
});

export const get = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
});

export const update = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
});

export const remove = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.json(result);
});
