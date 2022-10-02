import { Router } from "express";
import { deleteProduct, listProducts, newProduct } from "../controllers/productController";
import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const router = Router();

router.post("/registerproduct", validateToken, validateSchema("productSchema"), newProduct);
router.get("/myproducts", validateToken, listProducts);
router.delete("/product/:id", validateToken, deleteProduct);

export default router;