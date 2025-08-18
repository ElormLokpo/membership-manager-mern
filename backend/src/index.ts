import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  auth_routes,
  checkins_routes,
  establishments_routes,
  membership_routes,
  payment_routes,
  staff_routes,
} from "./routes/index.ts";
import {
  AuthorizationMiddleware,
  AuthTokenMiddleware,
  ErrorMiddleware,
} from "./middleware";

dotenv.config();

const APP: Express = express();
const PORT = process.env.PORT;

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

APP.use("/api/auth", auth_routes);
APP.use(
  "/api/establishments",
  AuthTokenMiddleware,
  AuthorizationMiddleware(["ADMIN"]),
  establishments_routes
);

APP.use(
  "/api/staff",
  AuthTokenMiddleware,
  AuthorizationMiddleware(["ADMIN"]),
  staff_routes
);

APP.use(
  "/api/memberships",
  AuthTokenMiddleware,
  AuthorizationMiddleware(["ADMIN", "STAFF"]),
  membership_routes
);

APP.use(
  "/api/payments",
  AuthTokenMiddleware,
  AuthorizationMiddleware(["ADMIN", "STAFF"]),
  payment_routes
);

APP.use(
  "/api/checkins",
  AuthTokenMiddleware,
  AuthorizationMiddleware(["STAFF"]),
  checkins_routes
);

// APP.use(ErrorMiddleware);

APP.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
