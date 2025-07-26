import { StaffPage } from "@/pages/dashboard/staff";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_layout/staff")({
  component: StaffPage,
});
