import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import RightPanel from "./common/RightPanel";

const RootLayout = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />

      <Outlet />

      <RightPanel />
    </div>
  );
};

export default RootLayout;
