import { axiosClient } from "@/api";
import type { AppDispatch } from "@/redux";
import type { LoginType } from "@/schema/authSchema";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  storeAuthUser,
  type IAuthUser,
  clearAuthUser,
} from "@/redux/reducers/authReducer";
import type { IRegisterRequest, IResponse } from "@/types";
import { useNavigate, type UseNavigateResult } from "@tanstack/react-router";
import { routes } from "@/constants";

const authSuccessHandler = (
  data: unknown,
  dispatch: AppDispatch,
  navigate: UseNavigateResult<string>,
  successText: string
) => {
  const { success, data: userData } = data as IResponse<IAuthUser>;
  if (success) {
    dispatch(storeAuthUser(userData));

    navigate({
      to: "/home",
    });
  }
  toast.success(successText);
};

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (loginData: LoginType) =>
      await axiosClient.post("/auth/login", loginData),
    onSuccess: (data: unknown) =>
      authSuccessHandler(data, dispatch, navigate, "Login successful!"),
  });
};

export const useRegister = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registerData: IRegisterRequest) =>
      await axiosClient.post("/auth/register", registerData),
    onSuccess: (data: unknown) =>
      authSuccessHandler(
        data,
        dispatch,
        navigate,
        "Account created successfully"
      ),
  });
};

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(clearAuthUser());
    navigate({
      to: routes["auth.login"],
    });
  };

  return { logoutUser };
};
