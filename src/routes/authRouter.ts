import { Router } from "express";
import { login, register }from "../controllers/authController";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const router = Router();

router.post("/signin", validateSchema("userSchema") ,login);
router.post("/signup", validateSchema("newUserSChema"), register);

export default router;