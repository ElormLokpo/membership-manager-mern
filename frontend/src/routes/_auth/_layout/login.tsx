import { LoginPage } from "@/pages/auth/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/login")({
  component: LoginPage,
});

