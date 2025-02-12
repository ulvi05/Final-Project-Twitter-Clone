import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex justify-center flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
