import { Router } from "express";
import { GetAllEstablishments } from "../controllers";

export const router = Router();

router.get("/all", GetAllEstablishments)

export default router;
