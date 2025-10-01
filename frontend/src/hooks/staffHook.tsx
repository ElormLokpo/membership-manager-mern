import { axiosClient } from "@/api";
import { type IModalContext } from "@/context/ModalContext";
import { store } from "@/redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useModal } from "./contextHooks";
import axios from "axios";

type CreateStaff = {
  authData: {
    fullname: string;
    email: string;
    password: string;
    role: string;
  };
  staffData: {
    position: string;
    employmentType: string;
    shift: string;
    establishmentId: null;
    photo: string;
  };
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setModal } = useModal() as IModalContext;

  return useMutation({
    mutationFn: async (staffData: CreateStaff) =>
      await axiosClient.post("/staff/add", staffData),
    onSuccess: () => {
      toast.success("Staff has been created successfully!");

      setModal(null);
      queryClient.invalidateQueries({ queryKey: ["get-all-staff"] });

      navigate({
        to: "/dashboard/staff",
      });
    },
  });
};

export const useGetAllStaff = () => {
  const establishmentId =
    store.getState().establishmentReducer.currentEstablishmentId;

  return useQuery({
    queryKey: ["get-all-staff"],
    queryFn: async () =>
      await axiosClient.get(`/staff/establishment/${establishmentId}`),
  });
};


export const useUpdaetStaff =  ()=>{

  return useMutation({
    mutationFn: async ()=> await axiosClient.patch(``)
  })
}