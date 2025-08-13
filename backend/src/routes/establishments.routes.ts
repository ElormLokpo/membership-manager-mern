import { Router } from "express";
import {
  CreateEstablishmentController,
  DeleteEstablishmentController,
  GetAllEstablishmentsController,
  GetEstablishmentByIdController,
  UpdateEstablishmentController,
} from "../controllers";

export const router = Router();

router.get("/all", GetAllEstablishmentsController);
router.get("/:id", GetEstablishmentByIdController);
router.post("/add", CreateEstablishmentController);
router.patch("/:id", UpdateEstablishmentController);
router.delete("/:id", DeleteEstablishmentController);

export default router;
