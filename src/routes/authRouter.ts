import { Router } from "express";
import { login }from "../controllers/authController";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const router = Router();

router.post("/signin", validateSchema("userSchema") ,login);

export default router;