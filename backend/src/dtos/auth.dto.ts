export interface IRegisterUser {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  role?: UserRoleType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export type UserRoleType = "ADMIN" | "STAFF" | "MEMBER";

export interface IAuthResponse {
  token: string;
  user: Omit<Partial<IRegisterUser>, "role"> & { role: UserRoleType | null };
}
