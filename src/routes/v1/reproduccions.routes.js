import { Router } from "express";
import * as controller from "../../controllers/reproduccion.controller.js";
import { paginationMiddleware } from "../../middlewares/pagination.middleware.js";
import { filtersMiddleware } from "../../middlewares/filters.middleware.js";

const router = Router();

router.get("/", paginationMiddleware, filtersMiddleware, controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;