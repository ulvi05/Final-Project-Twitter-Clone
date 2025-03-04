import LoadingSpinner from "@/components/common/LoadingSpinner";
import { RenderIf } from "@/components/common/RenderIf";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAppSelector } from "@/hooks/main";
import { useSocket } from "@/hooks/use-socket";
import conversationService from "@/services/conversation";
import { selectUserData } from "@/store/features/userSlice";
import { cn } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { CreateConversation } from "./CreateConversation";
import Sidebar from "./components/Sidebar";

export default function ChatPage() {
  const socket = useSocket();
  const { user } = useAppSelector(selectUserData);
  const [userId, setUserId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: conversationCreateData, isLoading: conversationCreateLoading } =
    useQuery({
      queryKey: [QUERY_KEYS.USER_CONVERSATION, userId],
      queryFn: () => conversationService.getConversation({ userId }),
      enabled: !!userId,
    });

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="flex min-h-screen antialiased text-gray-800">
      <Sidebar onSelectConversation={setUserId} />
      <div className="flex w-full h-full overflow-x-hidden">
        <RenderIf condition={conversationCreateLoading}>
          <div className="flex items-center justify-center w-full h-full translate-y-40">
            <LoadingSpinner />
          </div>
        </RenderIf>
        <RenderIf condition={!conversationCreateLoading}>
          <RenderIf condition={!conversationCreateData}>
            <div className="flex items-center justify-center w-full h-screen">
              <CreateConversation />
            </div>
          </RenderIf>
          <RenderIf condition={conversationCreateLoading}>
            <div className="flex items-center justify-center w-full h-full translate-y-40">
              <LoadingSpinner />
            </div>
          </RenderIf>
          <RenderIf
            condition={!!conversationCreateData && !conversationCreateLoading}
          >
            <div className="flex flex-col flex-auto h-screen p-6 border-r border-gray-700">
              <div className="flex flex-col flex-1 h-full p-4 text-white bg-black rounded-2xl">
                <div className="flex flex-col h-full mb-4 overflow-x-auto">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2 max-h-[640px]">
                      {Array.isArray(conversationCreateData?.items?.messages) &&
                        conversationCreateData?.items?.messages.map(
                          (message: string | any, index: number) => (
                            <MessageItem
                              key={index}
                              message={message.text}
                              owner={message.userId === user?._id}
                            />
                          )
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full h-16 px-4 bg-[#202327] rounded-xl">
                  <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        ref={inputRef}
                        type="text"
                        className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-blue-300"
                      />
                      <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-500">
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-xl">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 -mt-px transform rotate-45"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RenderIf>
        </RenderIf>
      </div>
    </div>
  );
}

const MessageItem = ({
  message,
  owner,
}: {
  message: string;
  owner: boolean;
}) => {
  return (
    <div
      className={cn(
        " p-3 rounded-lg",
        owner ? "col-start-6 col-end-13" : "col-start-1 col-end-8"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          owner && "justify-start flex-row-reverse"
        )}
      >
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
          A
        </div>
        <div
          className={cn(
            "relative px-4 py-2 text-sm shadow rounded-xl",
            owner ? "bg-blue-500 mr-3" : "bg-[#2f3336] ml-3"
          )}
        >
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
