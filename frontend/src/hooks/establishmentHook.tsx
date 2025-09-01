import { axiosClient } from "@/api";
import type { FullEstablishmentType } from "@/schema/establishmentSchema";
import type { CreateEstablishmentType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useCreateEstablishment = () => {
  const navigate = useNavigate();
  return useMutation({
  
    mutationFn: async (establishmentData: Partial<CreateEstablishmentType> | Partial<FullEstablishmentType>) =>
      await axiosClient.post("/establishments/add", establishmentData),
    onSuccess: () => {
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
