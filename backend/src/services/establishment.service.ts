import { UUID } from "crypto";
import { db } from "../db";
import { CreateEstablishmentType } from "../dtos";
import { EstablishmentModel } from "../models";
import { findUserByEmailService } from "./users.service";

export const getAllEstablishmentsService = async () => {};

export const getEstablishmentService = async () => {};

export const createEstablishmentService = async (
  establishmentDto: CreateEstablishmentType
) => {
  try {
    const validOwner = await findUserByEmailService(
      establishmentDto.ownerId as string
    );

    console.log("owner valid", validOwner);

    return await db
      .insert(EstablishmentModel)
      .values(establishmentDto)
      .onConflictDoNothing({ target: EstablishmentModel.name });
  } catch (e) {}
};

export const updateEstablishmentService = async () => {};

export const deleteEstablishmentService = async () => {};
