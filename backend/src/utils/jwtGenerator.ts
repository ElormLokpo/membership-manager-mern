import jwt from "jsonwebtoken";
import { UserRoleType } from "../dtos/auth.dto";
import { CustomError } from "../handlers/error.handlers";
import { StatusCodes } from "./statusCodes";

export interface ITokenPayload {
  role: UserRoleType;
  iat: number;
  exp: number;
}

export const generateToken = (payload: UserRoleType): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { role: payload },
      Buffer.from(process.env.JWT_SECRET || "", "base64"),
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    );
  });
};

export const verifyToken = (
  token: string
): Promise<ITokenPayload | CustomError> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      Buffer.from(process.env.JWT_SECRET || "", "base64"),
      {
        ignoreNotBefore: true,
      },
      (err, payload) => {
        if (err)
          reject(new CustomError(StatusCodes.UnAuthorized, "Invalid token."));
        else resolve(payload as ITokenPayload);
      }
    );
  });
};
