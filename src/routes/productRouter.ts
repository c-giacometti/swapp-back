import { Router } from "express";
import { listProducts, newProduct } from "../controllers/productController";
import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const router = Router();

router.post("/registerproduct", validateToken, validateSchema("productSchema"), newProduct);
router.get("/myproducts", validateToken, listProducts);

export default router;