import { Router } from "express";
import { InitializePaymentsController} from "../controllers";

export const router = Router();

router.post("/initialize", InitializePaymentsController)

export default router;
