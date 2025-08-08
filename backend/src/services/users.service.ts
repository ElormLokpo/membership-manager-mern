import { eq } from "drizzle-orm";
import { UserModel } from "../models";
import { db } from "../db";

export const findUserByEmail = async (email: string) => {
  return await db.select().from(UserModel).where(eq(UserModel.email, email));
};
