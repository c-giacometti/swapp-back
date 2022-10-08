import { Router } from "express";
import { showMatchs } from "../controllers/matchController";
import validateToken from "../middlewares/validateTokenMiddleware";

const router = Router();

router.get("/matchs", validateToken, showMatchs);

export default router;