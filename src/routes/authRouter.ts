import { Router } from "express";
import { login }from "../controllers/authController";
import schemas from "../schemas/schemas";

const router = Router();

router.post("/signin", login);

export default router;