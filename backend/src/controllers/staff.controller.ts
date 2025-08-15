import { Request, Response, NextFunction } from "express";
import { CustomError, ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";
import { ICreateStaff, IGetParams } from "../dtos";
import {
  createStaffService,
  deleteStaffService,
  getAllStaffService,
  getStaffByIdService,
  updateStaffService,
} from "../services";

export const GetAllStaffsController = async (
  req: Request<{}, {}, {}, IGetParams>,
  res: Response,
  next: NextFunction
) => {
  const staffData = await getAllStaffService(req.query);

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "All staff query successful.",
    staffData
  );
};

export const CreateStaffController = async (
  req: Request<{}, {}, ICreateStaff>,
  res: Response,
  next: NextFunction
) => {
  const staffData = await createStaffService(req.body);

  if (staffData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      staffData.statusCode,
      staffData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Created,
    "Staff created successfully."
  );
};

export const GetStaffByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const staffData = await getStaffByIdService(req.params.id);

  if (staffData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      staffData.statusCode,
      staffData.message
    );
  }

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "Staff query successful",
    staffData
  );
};

export const UpdateStaffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const staffData = await updateStaffService(
    req.params.id,
    req.body
  );

  if (staffData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      staffData.statusCode,
      staffData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Staff update successful"
  );
};

export const DeleteStaffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const staffData = await deleteStaffService(req.params.id);

  if (staffData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      staffData.statusCode,
      staffData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Staff delete successful"
  );
};
