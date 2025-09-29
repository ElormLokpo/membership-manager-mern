export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

//Auth data

export interface IRegisterRequest {
  fullname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IUser {
  id?: string | null;
  fullname: string | null;
  email: string | null;
  password: string | null;
  role?: UserRoleType | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type UserRoleType = "ADMIN" | "STAFF" | "MEMBER";

export interface IAuthResponse {
  token: string | null;
  user: (Omit<Partial<IUser>, "role"> & { role: UserRoleType | null }) | null;
}

//Establishment data

export type CreateEstablishmentType = {
  name: string;
  franchiseName?: string | null | undefined;
  type?: string | null | undefined;
  contactInfo?:
    | {
        email: string;
        phone: string;
        website: string;
      }
    | null
    | undefined;
  locationInfo?:
    | {
        country: string;
        city: string;
        address: string;
        landmark: string;
      }
    | null
    | undefined;
  establishmentStatus?: "ACTIVE" | "INACTIVE" | null | undefined;
  operatingHours?: string | null | undefined;
  ownerId?: string | null | undefined;
  capacityMetrics?:
    | {
        maxMembers: string;
        maxDailyVisitors: string;
      }
    | null
    | undefined;
};

//Staff type
export type CreateStaffType = {
  staffId?: string | undefined;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  userId?: string | null | undefined;
  establishmentId?: string | null | undefined;
  photo?: string | null | undefined;
  position?: "FRONTDESK" | null | undefined;
  employmentType?: "FULL-TIME" | "PART-TIME" | "CONTRACT" | null | undefined;
  shift?: "MORNING" | "AFTERNOON" | "EVENING" | null | undefined;
  hireDate?: string | null | undefined;
};

export interface IGetAllStaff {
  staff: {
    createdAt: Date | null;
    updatedAt: Date | null;
    staffId: string;
    userId: string | null;
    establishmentId: string | null;
    photo: string | null;
    position: "FRONTDESK" | null;
    employmentType: "FULL-TIME" | "PART-TIME" | "CONTRACT" | null;
    shift: "MORNING" | "AFTERNOON" | "EVENING" | null;
    hireDate: string | null;
  };
  user: {
    fullname: string;
    email: string;
  };
}
