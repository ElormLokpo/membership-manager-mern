import { Button } from "@/components/shared/button";
import { useLogout } from "@/hooks/authHook";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logoutUser } = useLogout();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      Sample
      <Button handler={handleLogout} variant={"secondary"} text="Logout" />
    </div>
  );
}
