import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const SimpleLayout = () => {
  return (
    <div className="flex w-full gap-8 mx-auto max-w-screen-2xl">
      <div className="w-1/5 min-w-[250px]">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SimpleLayout;
