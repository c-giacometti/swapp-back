import { Router } from "express";
import { likeProduct } from "../controllers/likeController";
import validateToken from "../middlewares/validateTokenMiddleware";

const router = Router();

router.post("/trade/:id", validateToken, likeProduct);

export default router;