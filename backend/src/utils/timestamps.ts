import * as t from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: t.timestamp().defaultNow(),
  updatedAt: t.timestamp().defaultNow(),
};
