import { Response } from "express";
import { StatusCodes } from "../utils/statusCodes";

export class ResponseHandler {
  constructor(public res: Response) {}

  successHandler(status: StatusCodes, message: String) {
    this.res.status(status).json({
      success: true,
      message,
    });

    return this;
  }

  successDataHandler<T>(status: StatusCodes, message: string, data: T) {
    this.res.status(status).json({
      success: true,
      message,
      data,
    });

    return this;
  }

  errorHandler(status: StatusCodes, message: string) {
    this.res.status(status).json({
      success: false,
      message,
    });

    return this;
  }

  errorDataHandler<T>(status: StatusCodes, message: string, data: T) {
    this.res.status(status).json({
      success: false,
      message,
      data,
    });

    return this;
  }
}
