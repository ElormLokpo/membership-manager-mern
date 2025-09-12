import { Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
 
  return (
    <div className="h-screen grid grid-cols-3">
      <div
        style={{
        
        }}
        className="col-span-2 bg-[#4CAF50]"
      >
        a
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
