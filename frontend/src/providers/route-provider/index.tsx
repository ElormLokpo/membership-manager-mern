import {
  createRouter,
  RouterProvider as RProvider,
} from "@tanstack/react-router";
import type { ReactElement } from "react";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <RProvider router={router} />
      {children}
    </>
  );
};
