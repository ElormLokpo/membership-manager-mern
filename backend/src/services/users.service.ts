import { eq, sql } from "drizzle-orm";
import { UserModel } from "../models";
import { db } from "../db";
import { IRegisterUser } from "../dtos";
import { CustomError } from "../handlers";

export const findUserByEmailService = async (email: string) =>
  await db.select().from(UserModel).where(eq(UserModel.email, email));

export const findUserByIdService = async (id: string) =>
  await db.select().from(UserModel).where(eq(UserModel.id, id));

export const updateUserService = async (
  id: string,
  userDto: Partial<IRegisterUser>
) => {
  const userFound = await findUserByIdService(id);

  if (userFound instanceof CustomError) {
    return userFound;
  } else {
    return await db.update(UserModel).set(userDto).where(eq(UserModel.id, id));
  }
};

export const deleteUserService = async (id: string) => {
  const userFound = await findUserByIdService(id);

  if (userFound instanceof CustomError) {
    return userFound;
  } else {
    
    return await db.delete(UserModel).where(eq(UserModel.id, id));
  }
};
