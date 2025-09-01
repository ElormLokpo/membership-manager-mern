import type { CreateEstablishmentType } from "@/types";
import { createContext, useContext } from "react";

export interface ICreateEstContext {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  completedSteps: number;
  setCompletedSteps: React.Dispatch<React.SetStateAction<number>>;
  establishmentData: object;
  setEstablishmentData: React.Dispatch<React.SetStateAction<object | CreateEstablishmentType>>;
}

export const CreateEstContext = createContext<ICreateEstContext | undefined>(
  undefined
);

export const useCreateEstContext = () => {
  return useContext(CreateEstContext) as ICreateEstContext;
};
