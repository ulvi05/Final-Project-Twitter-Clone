import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import RightPanel from "./common/RightPanel";
import { ChatPopover } from "./chat-popover";

const RootLayout = () => {
  return (
    <div className="flex mx-auto max-w-7xl">
      <Sidebar />

      <Outlet />

      <RightPanel />

      <ChatPopover />
    </div>
  );
};

export default RootLayout;
