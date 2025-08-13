import { Request, Response, NextFunction } from "express";
import { loginUserService, registerUserService } from "../services";
import { ResponseHandler, CustomError } from "../handlers";
import {
  IAuthResponse,
  ILoginUser,
  IRegisterUser,
  UserRoleType,
} from "../dtos";

import { StatusCodes, generateToken } from "../utils";

export const registerController = async (
  req: Request<{}, {}, IRegisterUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerUserData = await registerUserService(req.body);

    if (registerUserData instanceof CustomError) {
      return new ResponseHandler(res).errorHandler(
        StatusCodes.Conflict,
        registerUserData.message
      );
    }

    const token = await generateToken(registerUserData[0].role as UserRoleType);

    const responseData: IAuthResponse = {
      token,
      user: {
        id: registerUserData[0].id,
        fullname: registerUserData[0].fullname,
        email: registerUserData[0].email,
        role: registerUserData[0].role,
      },
    };

    return new ResponseHandler(res).successDataHandler(
      201,
      "User registered successfully",
      responseData
    );
  } catch (e) {
    next(e);
  }
};

export const loginController = async (
  req: Request<{}, {}, ILoginUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginUserData = await loginUserService(req.body);

    if (loginUserData instanceof CustomError) {
      return new ResponseHandler(res).errorHandler(
        loginUserData.statusCode,
        loginUserData.message
      );
    }

    const token = await generateToken(loginUserData[0].role as UserRoleType);

    const responseData: IAuthResponse = {
      token,
      user: {
        id: loginUserData[0].id,
        fullname: loginUserData[0].fullname,
        email: loginUserData[0].email,
        role: loginUserData[0].role,
      },
    };

    return new ResponseHandler(res).successDataHandler(
      200,
      "User login successful",
      responseData
    );
  } catch (e) {
    next(e);
  }
};
