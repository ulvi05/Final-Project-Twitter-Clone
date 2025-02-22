import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import usersService from "@/services/users";

import { User } from "@/types/User";
import useFollow from "@/hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import { paths } from "@/constants/paths";

const RightPanel = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_USERS],
    queryFn: usersService.getAll,
  });

  const { follow, isPending } = useFollow();

  if ((suggestedUsers as unknown as User[])?.length === 0)
    return <div className="w-0 md:w-64"></div>;

  return (
    <div className="hidden mx-4 my-4 lg:block max-w-[350px] sticky top-4 h-screen overflow-y-auto">
      <div className="mb-4 flex flex-col gap-2.5 border-[#16181c] border p-4 rounded-xl shadow-md items-start">
        <p className="text-lg font-extrabold text-white">
          Subscribe to Premium
        </p>
        <span className="text-[15px] text-[#e7e9ea] w-[316px]">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </span>
        <Link to={paths.SUBSCRIBE}>
          <button className="px-4 py-2 text-sm font-medium text-white transition bg-blue-500 rounded-full hover:bg-blue-600">
            Subscribe
          </button>
        </Link>
      </div>

      <div className="border-[#16181C] border p-4 rounded-xl shadow-md">
        <p className="mb-4 text-lg font-extrabold text-white">Who to follow</p>
        <div className="flex flex-col">
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            (suggestedUsers as unknown as User[])?.map((user: User) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4 hover:bg-[#1D1F23] p-2 rounded-lg transition-colors"
                key={user._id}
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 overflow-hidden border border-gray-600 rounded-full">
                      <img
                        src={user.profileImage || "/avatar-placeholder.png"}
                        alt={`${user.fullName}'s avatar`}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-gray-400">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="px-4 py-1 text-sm font-medium text-black transition-all bg-white rounded-full hover:bg-gray-200 disabled:opacity-50"
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                    disabled={isPending}
                  >
                    {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
        {!isLoading && (
          <div className="mt-4">
            <Link
              to="/explore"
              className="text-sm text-blue-400 hover:underline"
            >
              Show more
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-gray-500">
        <Link to="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link to="/cookies" className="hover:underline">
          Cookie Policy
        </Link>
        <Link to="/accessibility" className="hover:underline">
          Accessibility
        </Link>
      </div>
      <p className="mt-1 text-xs text-center">© 2025 X Corp.</p>
    </div>
  );
};

export default RightPanel;
