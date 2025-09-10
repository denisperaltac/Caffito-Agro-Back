import * as service from "../services/peso.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildPaginationResponse } from "../middlewares/pagination.middleware.js";

export const create = asyncHandler(async (req, res) => {
  const entity = await service.createPeso(req.body);
  res.status(201).json(entity);
});

export const list = asyncHandler(async (req, res) => {
  const { pagination, filters, sort } = req;
  const result = await service.listPesos({ pagination, filters, sort });

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
  const entity = await service.getPeso(req.params.id);
  res.json(entity);
});

export const update = asyncHandler(async (req, res) => {
  const entity = await service.updatePeso(req.params.id, req.body);
  res.json(entity);
});

export const remove = asyncHandler(async (req, res) => {
  const result = await service.deletePeso(req.params.id);
  res.json(result);
});
