import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "@/utils/db/dummy-data";

const RightPanel = () => {
  const isLoading = false;

  return (
    <div className="hidden mx-3 my-4 lg:block">
      <div className="mb-4 flex flex-col gap-2.5 border-[#16181c] border p-4 rounded-xl shadow-md items-start">
        <p className="text-lg font-extrabold text-white">
          Subscribe to Premium
        </p>
        <span className="text-[15px] text-[#e7e9ea] w-[316px]">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </span>
        <button className="px-4 py-2 text-sm font-medium text-white transition bg-blue-500 rounded-full hover:bg-blue-600">
          Subscribe
        </button>
      </div>

      <div className="border-[#16181C] border p-4 rounded-xl sticky top-2 shadow-md">
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
            USERS_FOR_RIGHT_PANEL?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4 hover:bg-[#1D1F23] p-2 rounded-lg transition-colors"
                key={user._id}
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 overflow-hidden border border-gray-600 rounded-full">
                      <img
                        src={user.profileImage || "/default-avatar.png"}
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
                    className="px-4 py-1 text-sm font-medium text-black transition-all bg-white rounded-full hover:bg-gray-200"
                    onClick={(e) => e.preventDefault()}
                  >
                    Follow
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

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
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
          <Link to="/ads" className="hover:underline">
            Ads info
          </Link>
          <Link to="/more" className="hover:underline">
            More...
          </Link>
        </div>
        <p className="mt-2">© 2025 X Corp.</p>
      </div>
    </div>
  );
};

export default RightPanel;
