import type { CreateEstablishmentType } from "@/types";
import { createContext, useContextSelector } from "use-context-selector";

export interface ICreateEstContext {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  completedSteps: number;
  setCompletedSteps: React.Dispatch<React.SetStateAction<number>>;
  establishmentData: object;
  setEstablishmentData: React.Dispatch<
    React.SetStateAction<object | CreateEstablishmentType>
  >;
}

export const CreateEstContext = createContext<ICreateEstContext | undefined>(
  undefined
);

export const useCreateEstContext = () => {
  return useContextSelector(CreateEstContext, (ctx) => ({
    setActiveIndex: ctx?.setActiveIndex,
    activeIndex: ctx?.activeIndex,
    completedSteps: ctx?.completedSteps,
    setCompletedSteps: ctx?.setCompletedSteps,
    establishmentData: ctx?.establishmentData,
    setEstablishmentData: ctx?.setEstablishmentData,
  })) as ICreateEstContext;
};
