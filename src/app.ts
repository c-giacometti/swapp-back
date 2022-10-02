import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

import authRouter from "./routes/authRouter";
import errorHandler from "./middlewares/errorHandlerMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(errorHandler);

export default app;