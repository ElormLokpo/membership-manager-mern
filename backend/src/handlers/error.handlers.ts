import { StatusCodes } from "../utils";

export class CustomError extends Error {
  statusCode: number | StatusCodes;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
