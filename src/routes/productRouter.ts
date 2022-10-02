import { Router } from "express";
import { deleteProduct, listProducts, newProduct, showProduct, updateProductInfo } from "../controllers/productController";
import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const router = Router();

router.post("/registerproduct", validateToken, validateSchema("productSchema"), newProduct);
router.get("/myproducts", validateToken, listProducts);
router.get("/product/:id", validateToken, showProduct);
router.put("/product/:id", validateToken, updateProductInfo);
router.delete("/product/:id", validateToken, deleteProduct);

export default router;