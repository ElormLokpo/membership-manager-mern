import { AuthLayout } from "@/layouts/authLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout")({
  component: AuthLayout,
});
