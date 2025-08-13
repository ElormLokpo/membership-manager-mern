import { EstablishmentModel } from "../models";

export type GetEstablishmentType = typeof EstablishmentModel.$inferSelect;
export type CreateEstablishmentType = Omit<
  typeof EstablishmentModel.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
