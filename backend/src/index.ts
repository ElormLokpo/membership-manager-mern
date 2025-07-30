import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const APP: Express = express();
const PORT = process.env.PORT;

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

APP.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
