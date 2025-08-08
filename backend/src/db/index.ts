import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "membership",
  ssl: false,
});

export const db = drizzle(pool);
