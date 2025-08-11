import { NextFunction, Request, Response } from "express";
import { ResponseHandler,CustomError } from "../handlers";

export const ErrorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    return new ResponseHandler(res).errorHandler(err.statusCode, err.message);
  } catch (e) {
    next(e);
  }
};
