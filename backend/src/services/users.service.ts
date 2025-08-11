import { eq } from "drizzle-orm";
import { UserModel } from "../models";
import { db } from "../db";
import { UUID } from "crypto";

export const findUserByEmailService = async (email: string) =>
  await db.select().from(UserModel).where(eq(UserModel.email, email));

export const findUserByIdService = async (id: string) =>
  await db.select().from(UserModel).where(eq(UserModel.id, id));
