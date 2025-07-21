import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen grid grid-cols-3">
      <div className="bg-lime-400 col-span-2">a</div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
