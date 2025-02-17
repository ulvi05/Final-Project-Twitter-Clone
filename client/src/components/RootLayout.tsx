import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import RightPanel from "./common/RightPanel";

const RootLayout = () => {
  return (
    <div className="flex mx-auto max-w-7xl">
      <Sidebar />

      <Outlet />

      <RightPanel />
    </div>
  );
};

export default RootLayout;
