import { NextFunction, Request, Response } from "express";
import { initializePaymentService } from "../services";
import { ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";

export const InitializePaymentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paymentData = await initializePaymentService();

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Created,
    "Payment initialized successfully.",
    paymentData
  );
};
