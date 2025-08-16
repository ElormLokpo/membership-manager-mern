import { MembershipModel } from "../models";
import { IRegisterUser } from "./auth.dto";

export type createMembershipType = typeof MembershipModel.$inferInsert;
export type getMembershipType = typeof MembershipModel.$inferSelect;

export interface ICreateMembership {
  authData: IRegisterUser;
  membershipData: createMembershipType;
}

export interface IMembershipResponse {
  membershipData: getMembershipType;
}
