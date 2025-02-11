import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
