import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../handlers/response.handler";
import { StatusCodes } from "../utils";

export const GetAllCheckins = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "All check-ins query successful."
  );
};
