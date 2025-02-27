import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const SimpleLayout = () => {
  return (
    <div className="flex w-full max-w-screen-xl gap-8 mx-auto">
      <div className="min-w-[250px] min-h-screen">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SimpleLayout;
