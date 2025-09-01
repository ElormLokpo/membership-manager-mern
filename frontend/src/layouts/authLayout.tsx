import { Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  const img =
    "https://images.unsplash.com/photo-1605144884374-ecbb643615f6?q=80&w=1292&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="h-screen grid grid-cols-3">
      <div
        style={{
          background: `url(${img})`,
          backgroundSize: "cover",
        }}
        className="col-span-2"
      >
        a
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
