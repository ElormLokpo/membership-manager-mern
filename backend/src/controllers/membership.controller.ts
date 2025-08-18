import { Request, Response, NextFunction } from "express";
import { CustomError, ResponseHandler } from "../handlers";
import { StatusCodes } from "../utils";
import { ICreateMembership, IGetParams } from "../dtos";
import {
  createMembershipService,
  deleteMembershipService,
  getAllMembershipService,
  getMembershipByIdService,
  updateMembershipService,
} from "../services";

export const GetAllMembershipsController = async (
  req: Request<{}, {}, {}, IGetParams>,
  res: Response,
  next: NextFunction
) => {
  const membershipData = await getAllMembershipService(req.query);

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "All membership query successful.",
    membershipData
  );
};

export const CreateMembershipController = async (
  req: Request<{}, {}, ICreateMembership>,
  res: Response,
  next: NextFunction
) => {
  const membershipData = await createMembershipService(req.body);

  if (membershipData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      membershipData.statusCode,
      membershipData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Created,
    "Membership created successfully."
  );
};

export const GetMembershipByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const membershipData = await getMembershipByIdService(req.params.id);

  if (membershipData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      membershipData.statusCode,
      membershipData.message
    );
  }

  return new ResponseHandler(res).successDataHandler(
    StatusCodes.Success,
    "Membership query successful",
    membershipData
  );
};

export const UpdateMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const membershipData = await updateMembershipService(req.params.id, req.body);

  if (membershipData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      membershipData.statusCode,
      membershipData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Membership update successful"
  );
};

//Don't forget renew membership logic.

export const DeleteMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const membershipData = await deleteMembershipService(req.params.id);

  if (membershipData instanceof CustomError) {
    return new ResponseHandler(res).errorHandler(
      membershipData.statusCode,
      membershipData.message
    );
  }

  return new ResponseHandler(res).successHandler(
    StatusCodes.Success,
    "Membership delete successful"
  );
};
