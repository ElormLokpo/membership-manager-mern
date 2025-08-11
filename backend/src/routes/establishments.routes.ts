import { Router } from "express";
import { CreateEstablishment, GetAllEstablishments } from "../controllers";

export const router = Router();

router.get("/all", GetAllEstablishments);
router.post("/add", CreateEstablishment);

export default router;
