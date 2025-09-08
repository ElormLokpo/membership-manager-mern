import { db } from "../db";
import { CreateEstablishmentType } from "../dtos";
import { EstablishmentModel } from "../models";
import { findUserByIdService } from "./users.service";
import { CustomError } from "../handlers";
import { StatusCodes } from "../utils";
import { validate as isValidId } from "uuid";
import { seedEstablishments } from "../seeders";
import { IGetParams } from "../dtos";
import { asc, desc, eq } from "drizzle-orm";

type sortColumns = keyof typeof EstablishmentModel;

export const getAllEstablishmentsService = async (
  getParams: Partial<IGetParams>
) => {
  let {
    sortBy = "name",
    sortDir = "asc",
    pageNo = 1,
    pageSize = 10,
  } = getParams;
  const order = sortDir == "asc" ? asc : desc;
  if (pageNo == 0) pageNo = 1;

  console.log("sort stuff", sortBy, sortDir, pageNo, pageSize);

  return await db
    .select()
    .from(EstablishmentModel)
    .limit(Number(pageSize))
    .offset((Number(pageNo) - 1) * Number(pageSize))
    .orderBy(order(EstablishmentModel.name)); //don't forget to work on the sortby.
};

export const getEstablishmentService = async () => {};

export const createEstablishmentService = async (
  establishmentDto: CreateEstablishmentType
) => {
  // await seedEstablishments();

  if (!isValidId(establishmentDto.ownerId)) {
    return new CustomError(StatusCodes.NotFound, "Invalid owner Id.");
  }
  const validOwner = await findUserByIdService(
    establishmentDto.ownerId as string
  );

  if (validOwner.length == 0) {
    return new CustomError(StatusCodes.NotFound, "Owner id does not exist.");
  } else {
    return await db
      .insert(EstablishmentModel)
      .values(establishmentDto)
      .onConflictDoNothing({ target: EstablishmentModel.name });
  }

  //find out if there is a less expensive way to validate id existence instead of running a query.
};

export const getEstablishmentByIdService = async (id: string) => {
  if (!isValidId(id)) {
    return new CustomError(StatusCodes.BadRequest, "Invalid Id.");
  }

  const establishmentData = await db
    .select()
    .from(EstablishmentModel)
    .where(eq(EstablishmentModel.id, id));

  if (establishmentData.length == 0) {
    return new CustomError(
      StatusCodes.NotFound,
      "Establishment with id does not exist"
    );
  }

  return establishmentData;
};

export const getEstablishmentByOwnerService = async (ownerId: string) => {
  if (!isValidId(ownerId)) {
    return new CustomError(StatusCodes.BadRequest, "Invalid Id.");
  }

  const establishmentData = await db
    .select()
    .from(EstablishmentModel)
    .where(eq(EstablishmentModel.ownerId, ownerId));

  if (establishmentData.length == 0) {
    return new CustomError(
      StatusCodes.NotFound,
      "Establishment with owner id does not exist"
    );
  }

  return establishmentData;
};

export const updateEstablishmentService = async (
  id: string,
  establishmentDto: Partial<CreateEstablishmentType>
) => {
  const establishmentFound = await getEstablishmentByIdService(id);

  if (establishmentFound instanceof CustomError) {
    return establishmentFound;
  } else {
    return await db
      .update(EstablishmentModel)
      .set(establishmentDto)
      .where(eq(EstablishmentModel.id, id));
  }
};

export const deleteEstablishmentService = async (id: string) => {
  const establishmentFound = await getEstablishmentByIdService(id);

  if (establishmentFound instanceof CustomError) {
    return establishmentFound;
  } else {
    return await db
      .delete(EstablishmentModel)
      .where(eq(EstablishmentModel.id, id));
  }
};
