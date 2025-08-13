import { ILoginUser, IRegisterUser, UserRoleType } from "../dtos";
import { compareEntity, hashEntity, StatusCodes } from "../utils";
import { db } from "../db";
import { UserModel } from "../models";
import { CustomError } from "../handlers";
import { findUserByEmailService } from "./users.service";

export const registerUserService = async (user: IRegisterUser) => {
  const userExists = await findUserByEmailService(user.email);

  if (userExists.length !== 0) {
    return new CustomError(StatusCodes.Conflict, "User already exists.");
  }

  user = { ...user, password: await hashEntity(user.password) };
  if (!user.role) {
    user = { ...user, role: "ADMIN" };
  }

  user = { ...user, role: user.role as UserRoleType };

  return await db.insert(UserModel).values(user).returning();
};

export const loginUserService = async (authData: ILoginUser) => {
  const userExists = await findUserByEmailService(authData.email);

  if (userExists.length == 0) {
    return new CustomError(StatusCodes.NotFound, "User does not exist.");
  }

  const comparePassword = await compareEntity(
    authData.password,
    userExists[0].password
  );

  if (comparePassword) {
    return userExists;
  }

  return new CustomError(StatusCodes.UnAuthorized, "Password incorrect.");
};
