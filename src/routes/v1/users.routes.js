import { Router } from "express";
import * as userController from "../../controllers/user.controller.js";
import { paginationMiddleware } from "../../middlewares/pagination.middleware.js";
import { filtersMiddleware } from "../../middlewares/filters.middleware.js";

const router = Router();

router.get("/", paginationMiddleware, filtersMiddleware, userController.list);
router.post("/", userController.create);
router.get("/:id", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;
