import { Router } from "express";
import { likeProduct } from "../controllers/likeController";
import validateSchema from "../middlewares/validateSchemaMiddleware";
import validateToken from "../middlewares/validateTokenMiddleware";

const router = Router();

router.post("/trade/:id", validateToken, validateSchema("likeSchema"), likeProduct);

export default router;