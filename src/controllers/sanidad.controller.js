import * as service from "../services/sanidad.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildPaginationResponse } from "../middlewares/pagination.middleware.js";

export const create = asyncHandler(async (req, res) => {
  const entity = await service.createSanidad(req.body);
  res.status(201).json(entity);
});

export const list = asyncHandler(async (req, res) => {
  const { pagination, filters, sort } = req;
  const result = await service.listSanidads({ pagination, filters, sort });
  
  if (pagination) {
    const response = buildPaginationResponse(result.data, pagination, result.total);
    res.json(response);
  } else {
    res.json(result.data);
  }
});

export const get = asyncHandler(async (req, res) => {
  const entity = await service.getSanidad(req.params.id);
  res.json(entity);
});

export const update = asyncHandler(async (req, res) => {
  const entity = await service.updateSanidad(req.params.id, req.body);
  res.json(entity);
});

export const remove = asyncHandler(async (req, res) => {
  const result = await service.deleteSanidad(req.params.id);
  res.json(result);
});