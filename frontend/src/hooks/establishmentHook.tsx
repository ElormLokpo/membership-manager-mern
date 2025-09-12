import { axiosClient } from "@/api";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { store } from "@/redux";
import type { FullEstablishmentType } from "@/schema/establishmentSchema";
import type { CreateEstablishmentType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { toast } from "sonner";

export const useCreateEstablishment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (
      establishmentData:
        | Partial<CreateEstablishmentType>
        | Partial<FullEstablishmentType>
    ) => await axiosClient.post("/establishments/add", establishmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishment-by-owner"] });
      toast.success("Your establishment has been created successfully!");

      navigate({
        to: "/dashboard",
      });
    },
    onError: (error: unknown) => {
      console.log("Establishment creation error", error);
    },
  });
};

export const useUpdateEstablishment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({
      establishmentData,
      establishmentId
    }:{
      establishmentData:
        | Partial<CreateEstablishmentType>
        | Partial<FullEstablishmentType>,
      establishmentId?: string
    }
    ) =>
      await axiosClient.patch(
        `/establishments/${establishmentId}`,
        establishmentData
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishment-by-owner"] });
      toast.success("Your establishment has been updated successfully!");

      navigate({
        to: "/dashboard",
      });
    },
    onError: (error: unknown) => {
      console.log("Establishment update error", error);
    },
  });
};

export const useGetEstablishmentByOwner = () => {
  const ownerId = store.getState().authReducer.user?.id;

  return useQuery({
    queryKey: ["establishment-by-owner"],
    queryFn: async () =>
      await axiosClient.get(`/establishments/owner/${ownerId}`),
  });
};

export const useGetEstablishmentById = (establishmentId: string) => {
  return useQuery({
    queryKey: ["establishment-by-id"],
    queryFn: async () =>
      await axiosClient.get(`/establishments/${establishmentId}`),
    enabled: !!establishmentId,
  });
};

export const useDeleteEstablishmentByOwner = () => {
  const queryClient = useQueryClient();
  const { setModal } = useContext(ModalContext) as IModalContext;

  return useMutation({
    mutationFn: async (id: string) =>
      await axiosClient.delete(`/establishments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishment-by-owner"] });
      toast.success("Your establishment has been deleted successfully!");
      setModal(null);
    },
    onError: (error: unknown) => {
      console.log("Establishment creation error", error);
    },
  });
};
