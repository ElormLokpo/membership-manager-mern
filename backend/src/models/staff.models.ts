import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import crypto from "crypto";
import { UserModel } from "./user.model";
import { timestamps } from "../utils";
import { EstablishmentModel } from "./establishment.model";

export const employmentType = t.pgEnum("employmentType", [
  "FULL-TIME",
  "PART-TIME",
  "CONTRACT",
]);
export const position = t.pgEnum("position", ["FRONTDESK"]);
export const shift = t.pgEnum("shift", ["MORNING", "AFTERNOON", "EVENING"]);

export const StaffModel = table("staff", {
  staffId: t
    .uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: t.uuid().references(() => UserModel.id, { onDelete: "cascade" }),
  establishmentId: t
    .uuid()
    .references(() => EstablishmentModel.id, { onDelete: "cascade" }),
  photo: t.varchar(),
  position: position().default("FRONTDESK"),
  employmentType: employmentType().default("FULL-TIME"),
  shift: shift().default("MORNING"),
  hireDate: t.date().defaultNow(),
  ...timestamps,
});
