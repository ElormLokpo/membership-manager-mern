import { asc, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { ICreateMembership, IGetParams } from "../dtos";
import { CustomError } from "../handlers";
import { MembershipModel, UserModel } from "../models";
import { registerUserService } from "./auth.service";
import { validate as isValidId } from "uuid";
import { StatusCodes } from "../utils";
import { deleteUserService, updateUserService } from "./users.service";
import { addMonths, format } from "date-fns";

export const createMembershipService = async (
  membershipDto: ICreateMembership
) => {
  const { authData, membershipData } = membershipDto;

  const registerUser = await registerUserService(authData);

  if (registerUser instanceof CustomError) {
    return registerUser;
  } else {
    membershipData.userId = registerUser[0].id;
    membershipData.endDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

    return await db
      .insert(MembershipModel)
      .values({ ...membershipData })
      .returning();
  }
};

export const getAllMembershipService = async (
  getParams: Partial<IGetParams>
) => {
  let {
    sortBy = "name",
    sortDir = "asc",
    pageNo = 1,
    pageSize = 10,
  } = getParams;

  if (pageNo == 0) pageNo = 1;

  return await db
    .select({
      membership: MembershipModel,
      user: {
        fullname: UserModel.fullname,
        email: UserModel.email,
      },
    })
    .from(MembershipModel)
    .innerJoin(UserModel, eq(MembershipModel.userId, UserModel.id));
};

export const getMembershipByIdService = async (membershipId: string) => {
  if (!isValidId(membershipId)) {
    return new CustomError(StatusCodes.BadRequest, "Invalid Id.");
  }

  const membershipData = await db
    .select({
      membership: MembershipModel,
      user: {
        fullname: UserModel.fullname,
        email: UserModel.email,
      },
    })
    .from(MembershipModel)
    .where(eq(MembershipModel.membershipId, membershipId))
    .innerJoin(UserModel, eq(MembershipModel.userId, UserModel.id));

  if (membershipData.length == 0) {
    return new CustomError(
      StatusCodes.NotFound,
      "Membership with id does not exist"
    );
  }

  return membershipData;
};

export const updateMembershipService = async (
  membershipId: string,
  membershipDto: ICreateMembership
) => {
  const membershipFound = await getMembershipByIdService(membershipId);

  if (membershipFound instanceof CustomError) {
    return membershipFound;
  } else {
    await updateUserService(
      membershipFound[0].membership.userId as string,
      membershipDto.authData
    );

    return await db
      .update(MembershipModel)
      .set(membershipDto.membershipData)
      .where(eq(MembershipModel.membershipId, membershipId));
  }
};

export const deleteMembershipService = async (id: string) => {
  const membershipFound = await getMembershipByIdService(id);

  if (membershipFound instanceof CustomError) {
    return membershipFound;
  } else {
    await db
      .delete(MembershipModel)
      .where(eq(MembershipModel.membershipId, id));

    return await deleteUserService(
      membershipFound[0].membership.userId as string
    );
  }
};
