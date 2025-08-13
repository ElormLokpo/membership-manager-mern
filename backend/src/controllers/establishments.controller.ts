import { Request, Response, NextFunction } from "express";
import { CustomError, ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";
import { CreateEstablishmentType, IGetParams } from "../dtos";
import {
  createEstablishmentService,
  deleteEstablishmentService,
  getAllEstablishmentsService,
  getEstablishmentByIdService,
  updateEstablishmentService,
} from "../services";

export const GetAllEstablishmentsController = async (
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

export const CreateEstablishmentController = async (
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

export const GetEstablishmentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const establishmentData = await getEstablishmentByIdService(req.params.id);

  if (establishmentData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      establishmentData.statusCode,
      establishmentData.message
    );
  }

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "Establishment query successful",
    establishmentData
  );
};

export const UpdateEstablishmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const establishmentData = await updateEstablishmentService(
    req.params.id,
    req.body
  );

  if (establishmentData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      establishmentData.statusCode,
      establishmentData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Establishment update successful"
  );
};

export const DeleteEstablishmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const establishmentData = await deleteEstablishmentService(req.params.id);

  if (establishmentData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      establishmentData.statusCode,
      establishmentData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Establishment delete successful"
  );
};
