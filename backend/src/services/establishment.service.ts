import { UUID } from "crypto";
import { db } from "../db";
import { CreateEstablishmentType } from "../dtos";
import { EstablishmentModel } from "../models";
import { findUserByIdService } from "./users.service";
import { CustomError } from "../handlers";
import { StatusCodes } from "../utils";
import { validate as isValidId } from "uuid";
import { seedEstablishments } from "../seeders";
import { IGetParams } from "../dtos";
import { asc, desc } from "drizzle-orm";

type sortColumns = keyof typeof EstablishmentModel;

export const getAllEstablishmentsService = async (
  getParams: Partial<IGetParams>
) => {
  const {
    sortBy = "name",
    sortDir = "asc",
    pageNumber = 1,
    pageSize = 10,
  } = getParams;
  const order = sortDir == "asc" ? asc : desc;

  return await db
    .select()
    .from(EstablishmentModel)
    .limit(pageSize)
    .offset((pageNumber - 1) * pageSize)
    .orderBy(order(EstablishmentModel.name));
};

export const getEstablishmentService = async () => {};

export const createEstablishmentService = async (
  establishmentDto: CreateEstablishmentType
) => {
  await seedEstablishments();

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

  //find out if there is a less expensive way to validate id instead of running a query.
};

export const updateEstablishmentService = async () => {};

export const deleteEstablishmentService = async () => {};
