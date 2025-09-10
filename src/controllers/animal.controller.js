import * as animalService from "../services/animal.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildPaginationResponse } from "../middlewares/pagination.middleware.js";

export const create = asyncHandler(async (req, res) => {
  const entity = await animalService.createAnimal(req.body);
  res.status(201).json(entity);
});

export const list = asyncHandler(async (req, res) => {
  const { pagination, filters, sort } = req;
  const result = await animalService.listAnimals({ pagination, filters, sort });

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
  const entity = await animalService.getAnimalByRp(req.params.rp);
  res.json(entity);
});

export const update = asyncHandler(async (req, res) => {
  const entity = await animalService.updateAnimal(req.params.rp, req.body);
  res.json(entity);
});

export const remove = asyncHandler(async (req, res) => {
  const result = await animalService.deleteAnimal(req.params.rp);
  res.json(result);
});
