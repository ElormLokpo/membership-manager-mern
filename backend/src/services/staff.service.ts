import { asc, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { ICreateStaff, IGetParams } from "../dtos";
import { CustomError } from "../handlers";
import { StaffModel, UserModel } from "../models";
import { registerUserService } from "./auth.service";
import { validate as isValidId } from "uuid";
import { StatusCodes } from "../utils";
import { deleteUserService, updateUserService } from "./users.service";

export const createStaffService = async (staffDto: ICreateStaff) => {
  const { authData, staffData } = staffDto;

  const registerUser = await registerUserService(authData);

  if (registerUser instanceof CustomError) {
    return registerUser;
  } else {
    staffData.userId = registerUser[0].id;

    return await db.insert(StaffModel).values(staffData).returning();
  }
};

export const getAllStaffService = async (getParams: Partial<IGetParams>) => {
  let {
    sortBy = "name",
    sortDir = "asc",
    pageNo = 1,
    pageSize = 10,
  } = getParams;

  if (pageNo == 0) pageNo = 1;

  return await db
    .select({
      staff: StaffModel,
      user: {
        fullname: UserModel.fullname,
        email: UserModel.email,
      },
    })
    .from(StaffModel)
    .innerJoin(UserModel, eq(StaffModel.userId, UserModel.id));
};

export const getStaffByIdService = async (staffId: string) => {
  if (!isValidId(staffId)) {
    return new CustomError(StatusCodes.BadRequest, "Invalid Id.");
  }

  const staffData = await db
    .select({
      staff: StaffModel,
      user: {
        fullname: UserModel.fullname,
        email: UserModel.email,
      },
    })
    .from(StaffModel)
    .where(eq(StaffModel.staffId, staffId))
    .innerJoin(UserModel, eq(StaffModel.userId, UserModel.id));

  if (staffData.length == 0) {
    return new CustomError(
      StatusCodes.NotFound,
      "Staff with id does not exist"
    );
  }

  return staffData;
};

export const updateStaffService = async (
  staffId: string,
  staffDto: ICreateStaff
) => {
  const staffFound = await getStaffByIdService(staffId);

  if (staffFound instanceof CustomError) {
    return staffFound;
  } else {
    await updateUserService(
      staffFound[0].staff.userId as string,
      staffDto.authData
    );

    return await db
      .update(StaffModel)
      .set(staffDto.staffData)
      .where(eq(StaffModel.staffId, staffId));
  }
};

export const deleteStaffService = async (id: string) => {
  const staffFound = await getStaffByIdService(id);

  if (staffFound instanceof CustomError) {
    return staffFound;
  } else {
    
    await db.delete(StaffModel).where(eq(StaffModel.staffId, id));

    return await deleteUserService(staffFound[0].staff.userId as string);
  }
};
