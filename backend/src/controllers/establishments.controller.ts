import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../handlers/response.handler";
import { StatusCodes } from "../utils";

export const GetAllEstablishments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "All establishments query successful."
  );
};
