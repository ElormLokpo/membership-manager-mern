import { Request, Response, NextFunction } from "express";
import { CustomError, ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";
import { CreateEstablishmentType, IGetParams } from "../dtos";
import {
  createEstablishmentService,
  getAllEstablishmentsService,
} from "../services";

export const GetAllEstablishments = async (
  req: Request<{}, {}, {}, IGetParams>,
  res: Response,
  next: NextFunction
) => {
  
  const establishmentData = await getAllEstablishmentsService(req.query);

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "All establishments query successful.",
    establishmentData
  );
};

export const CreateEstablishment = async (
  req: Request<{}, {}, CreateEstablishmentType>,
  res: Response,
  next: NextFunction
) => {
  const establishmentData = await createEstablishmentService(req.body);

  if (establishmentData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      establishmentData.statusCode,
      establishmentData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Created,
    "Establishment created successfully."
  );
};
