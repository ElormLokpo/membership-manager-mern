import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import crypto from "crypto";
import { timestamps } from "../utils";
import { relations } from "drizzle-orm";
import { UserModel } from "./user.model";

export const establishmentStatus = pgEnum("establishmentStatus", [
  "ACTIVE",
  "INACTIVE",
]);

export const EstablishmentModel = table("establishments", {
  id: t
    .uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.varchar().unique().notNull(),
  franchiseName: t.varchar(),
  type: t.varchar(),
  contactInfo: t
    .jsonb("contactInfo")
    .$type<{ email: string; phone: string; website: string }>(),
  locationInfo: t.jsonb("locationInfo").$type<{
    country: string;
    city: string;
    address: string;
    landmark: string;
  }>(),
  establishmentStatus: establishmentStatus().default("ACTIVE"),
  operatingHours: t.varchar(),
  ownerId: t.uuid().references(() => UserModel.id),
  capacityMetrics: t
    .jsonb("capacityMetrics")
    .$type<{ maxMembers: string; maxDailyVisitors: string }>(),
  ...timestamps,
});

export const establishmentRelations = relations(
  EstablishmentModel,
  ({ one }) => ({
    owner: one(UserModel, {
      fields: [EstablishmentModel.ownerId],
      references: [UserModel.id],
    }),
  })
);
