import { Router } from "express";
import { newProduct } from "../controllers/productController";
import validateToken from "../middlewares/validateTokenMiddleware";

const router = Router();

router.post("/registerproduct", validateToken, newProduct);

export default router;