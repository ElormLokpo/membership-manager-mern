import { Router } from "express";
import { GetAllCheckins } from "../controllers";

export const router = Router();

router.get("/all", GetAllCheckins)

export default router;
