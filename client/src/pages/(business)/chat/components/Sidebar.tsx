import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import conversationService from "@/services/conversation";
import { RenderIf } from "@/components/common/RenderIf";
import { ActiveConversationSkeleton } from "@/components/skeletons/ActiveConversationSkeleton";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";

export default function Sidebar({
  onSelectConversation,
}: {
  onSelectConversation: (userId: string, chatMessages: any[]) => void;
}) {
  const { data: conversationData, isLoading: conversationsLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_CONVERSATION],
    queryFn: () => conversationService.getAll(),
  });

  console.log("Fetched Conversations:", conversationData);

  const conversations = conversationData?.data?.conversations || [];

  return (
    <div className="flex flex-col w-64 py-8 pl-2 pr-2.5 bg-black border-r border-gray-700 flex-shrink-0">
      <div className="flex flex-row items-center justify-center w-full h-12">
        <div className="flex items-center justify-center w-10 h-10 text-black bg-indigo-100 rounded-2xl">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 text-2xl font-bold text-white">Messages</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold text-white">Active Conversations</span>
          <span className="flex items-center justify-center w-4 h-4 text-black bg-white rounded-full">
            {conversations.length}
          </span>
        </div>
        <RenderIf condition={conversationsLoading}>
          <ActiveConversationSkeleton />
        </RenderIf>
        <RenderIf
          condition={!conversationsLoading && conversations.length === 0}
        >
          <div className="mt-4 text-sm text-center text-gray-400">
            No conversations found. Start a new one!
          </div>
        </RenderIf>
        <RenderIf condition={!conversationsLoading && conversations.length > 0}>
          <div className="flex flex-col mt-4 -mx-2 space-y-1 overflow-y-auto h-52">
            {conversations.map((conversation: any) => (
              <Link
                to={paths.CHAT.USER(conversation._id)}
                key={conversation._id}
                className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl"
                onClick={() =>
                  onSelectConversation(conversation._id, conversation.messages)
                }
              >
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-200 rounded-full">
                  <img
                    src={
                      conversation.recipient?.profileImage ||
                      "/avatar-placeholder.png"
                    }
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  {conversation.recipient?.username || "User"}
                </div>
              </Link>
            ))}
          </div>
        </RenderIf>
      </div>
    </div>
  );
}
