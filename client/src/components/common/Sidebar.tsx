import XSvg from "@/components/svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { PiOpenAiLogoBold } from "react-icons/pi";

const Sidebar = () => {
  const data = {
    fullName: "Ulvi Aghazade",
    username: "ulvi05",
    profileImage: "/avatars/samurai.png",
  };

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-5xl">
      <div className="sticky top-0 left-0 flex flex-col w-20 h-screen pl-2 pr-2 border-r border-gray-700 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="w-12 h-12 px-2 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to="/"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="hidden text-xl md:block">Home</span>
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to="/explore"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <IoSearch className="w-6 h-6" />
              <span className="hidden text-xl md:block">Explore</span>
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to="/notifications"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="hidden text-xl md:block">Notifications</span>
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to="/messages"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <IoMdMail className="w-6 h-6" />
              <span className="hidden text-xl md:block">Messages</span>
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to="/grok"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <PiOpenAiLogoBold className="w-6 h-6" />
              <span className="hidden text-xl md:block">ChatGPT</span>
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer group md:justify-start">
            <Link
              to={`/profile/${data?.username}`}
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer max-w-fit group-hover:bg-stone-900"
            >
              <FaUser className="w-6 h-6" />
              <span className="hidden text-xl md:block">Profile</span>
            </Link>
          </li>
        </ul>

        {data && (
          <Link
            to={`/profile/${data.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="hidden avatar md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={data?.profileImage || "/avatars/samurai.png"} />
              </div>
            </div>
            <div className="flex items-center justify-between flex-1">
              <div className="hidden md:block">
                <p className="w-20 text-sm font-bold text-white truncate">
                  {data?.fullName}
                </p>
                <p className="text-sm text-slate-500">@{data?.username}</p>
              </div>
              <BiLogOut className="w-5 h-5 cursor-pointer" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
