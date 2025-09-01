import { createFileRoute } from "@tanstack/react-router";
import { store } from "@/redux";
import { CreateEstablishmentPage } from "@/pages/dashboard/establishments/create-establishment/create-establishment-page";

export const Route = createFileRoute("/create-establishment")({
  beforeLoad: () => {
    const reduxStore = store.getState().authReducer;
    console.log("REDUX STOOOREEE", reduxStore);
  },
  component: CreateEstablishmentPage
});

