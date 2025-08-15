import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { UserModel } from "./user.model";
import { timestamps } from "../utils";

export const membershipStatus = pgEnum("membershipStatus", [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
]);
export const billingCycle = pgEnum("billingCycle", ["MONTHLY", "YEARLY"]);
export const paymentStatus = pgEnum("paymentStatus", ["PAID", "PENDING", "OVERDUE"]);

export const MembershipModel = table("membership", {
  id: t
    .uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: t.uuid().references(() => UserModel.id),
  joinDate: t.timestamp().defaultNow(),
  membershipStatus: membershipStatus().default("ACTIVE"),
  planName: t.varchar(),
  billingCycle: billingCycle().default("MONTHLY"),
  durationMonths: t.integer(),
  pricePerMonth: t.doublePrecision(),
  currency: t.varchar(),
  startDate: t.date(), 
  endDate:t.date(),
  autoRenew: t.boolean(),
  paymentStatus: paymentStatus().default("PENDING"),
  ...timestamps
});
