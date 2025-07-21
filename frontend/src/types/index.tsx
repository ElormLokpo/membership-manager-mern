export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IRegisterRequest {
  fullname: string;
  email: string;
  password: string;
  roles: string[];
}
