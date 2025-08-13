import { NextFunction, Request, Response } from "express";
import { CustomError } from "../handlers";
import { StatusCodes, ITokenPayload, verifyToken } from "../utils";

import { UserRoleType } from "../dtos";

export const AuthTokenMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(
        new CustomError(
          StatusCodes.UnAuthorized,
          "Access denied. No or invalid token"
        )
      );
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return next(
        new CustomError(
          StatusCodes.UnAuthorized,
          "Access denied. No or invalid token"
        )
      );
    }

    const tokenPayload: ITokenPayload | CustomError = await verifyToken(token);

    if (tokenPayload instanceof CustomError) {
      return next(tokenPayload);
    }

    req.role = tokenPayload.role;
    next();
  } catch (e) {
    next(e);
  }
};

export const AuthorizationMiddleware = (allowedRoles: UserRoleType[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.role || !allowedRoles.includes(req.role as UserRoleType)) {
      return next(
        new CustomError(StatusCodes.Forbidden, "Unauthorized to access route")
      );
    }

    return next();
  };
};
