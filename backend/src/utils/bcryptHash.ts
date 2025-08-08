import { hash, compare, genSalt } from "bcrypt";

export const hashEntity = async (entity: string) => await hash(entity, await genSalt(10));
export const compareEntity = async (entity: string, hashed: string) => await compare(entity, hashed);
