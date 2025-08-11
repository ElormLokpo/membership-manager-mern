import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";
import { CreateEstablishmentType } from "../dtos";
import { createEstablishmentService } from "../services";

export const GetAllEstablishments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "All establishments query successful."
  );
};

export const CreateEstablishment = async (
  req: Request<{}, {}, CreateEstablishmentType>,
  res: Response,
  next: NextFunction
) => {
  const establishmentData = await createEstablishmentService(req.body);

  console.log("POST RETURN DATA", establishmentData);
  return new ResponseHandler(res).successHandler(
    StatusCodes.Created,
    "Establishment created successfully."
  );
};
