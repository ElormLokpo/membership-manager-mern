import { StaffModel } from "../models";
import { IRegisterUser } from "./auth.dto";

export type createStaffType = typeof StaffModel.$inferInsert;
export type getStaffType = typeof StaffModel.$inferSelect;

export interface ICreateStaff {
  authData: IRegisterUser;
  staffData: createStaffType;
}

export interface IStaffResponse {
  staffData: getStaffType;
}
