import { Router } from "express";
import { login }from "../controllers/authController";

const router = Router();

router.post("/signin", login);

export default router;