import { Router } from "express";
import {
  GetAllStaffsController,
  GetStaffByIdController,
  CreateStaffController,
  UpdateStaffController,
  DeleteStaffController,
  GetStaffByEstablishmentController,
} from "../controllers";

export const router = Router();

router.get("/all", GetAllStaffsController);
router.get("/:id", GetStaffByIdController);
router.get("/establishment/:id", GetStaffByEstablishmentController);

router.post("/add", CreateStaffController);
router.patch("/:id", UpdateStaffController);
router.delete("/:id", DeleteStaffController);

export default router;
