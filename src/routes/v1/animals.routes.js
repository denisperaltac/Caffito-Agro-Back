import { Router } from "express";
import * as controller from "../../controllers/animal.controller.js";
import { paginationMiddleware } from "../../middlewares/pagination.middleware.js";
import { filtersMiddleware } from "../../middlewares/filters.middleware.js";

const router = Router();

router.get("/", paginationMiddleware, filtersMiddleware, controller.list);
router.post("/", controller.create);
router.get("/:rp", controller.get);
router.put("/:rp", controller.update);
router.delete("/:rp", controller.remove);

export default router;
