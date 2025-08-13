import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../utils";
import crypto from "crypto";
import { relations } from "drizzle-orm";
import { EstablishmentModel } from "./establishment.model";

export const role = pgEnum("role", ["ADMIN", "FRONTDESK", "MEMBER"]);

export const UserModel = table("users", {
  id: t
    .uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fullname: t.varchar().notNull(),
  email: t.varchar().notNull().unique(),
  password: t.varchar().notNull(),
  role: role().default("ADMIN"),
  ...timestamps,
});

export const userRelations = relations(UserModel, ({ many }) => ({
  establishments: many(EstablishmentModel),
}));
