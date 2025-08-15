import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { MembershipModel } from "./membership.model";
import { timestamps } from "../utils";

export const paymentStatus = pgEnum("paymentStatus", ["SUCCESSFUL","FAILED", "REFUNDED"])

export const PaymentModel = table("payments", {
  id: t
    .uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  membershipId: t.uuid().references(() => MembershipModel.id),
  paymentDate: t.timestamp().defaultNow(),
  paymentStatus: paymentStatus().default("SUCCESSFUL"),
  ...timestamps
});
