import { Router } from "express";
import {
  GetAllMembershipsController,
  GetMembershipByIdController,
  CreateMembershipController,
  UpdateMembershipController,
  DeleteMembershipController,
} from "../controllers";

export const router = Router();

router.get("/all", GetAllMembershipsController);
router.get("/:id", GetMembershipByIdController);
router.post("/add", CreateMembershipController);
router.patch("/:id", UpdateMembershipController);
router.delete("/:id", DeleteMembershipController);

export default router;
