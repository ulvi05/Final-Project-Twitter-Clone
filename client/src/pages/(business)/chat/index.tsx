import LoadingSpinner from "@/components/common/LoadingSpinner";
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
import { useParams } from "react-router-dom";
import { ChatInput } from "./components/ChatInput";

export default function ChatPage() {
  const { id } = useParams();

  const socket = useSocket();
  const { user } = useAppSelector(selectUserData);
  const [userId, setUserId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: conversationCreateData, isLoading: conversationCreateLoading } =
    useQuery({
      queryKey: [QUERY_KEYS.USER_CONVERSATION, { userId }],
      queryFn: () => conversationService.getByUserId({ userId }),
      enabled: !!userId,
    });

  const {
    data: chatData,
    isLoading: isChatLoading,
    status,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_CHAT, { id }],
    queryFn: () => conversationService.getById({ id: id! }),
    enabled: !!id,
  });
  const [messages, setMessages] = useState<
    { text: string; userId: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message) => {
      console.log("message: ", message);
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!socket) return;
    e.preventDefault();
    const message = inputRef.current?.value.trim();
    const to = chatData?.data?.item?.recipientId;
    const from = user?._id;
    if (!message || !to || !from) return;
    inputRef.current!.value = "";

    socket.emit("message", {
      message,
      to,
      from,
    });
    setMessages((prev) => [
      ...prev,
      { text: message, userId: from, createdAt: new Date().toISOString() },
    ]);
  };

  useEffect(() => {
    if (status === "success" && chatData) {
      setMessages(
        chatData?.data?.item.messages.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt).toISOString(),
        }))
      );
    }
  }, [chatData, status]);

  console.log("conversationCreateData: ", conversationCreateData);
  console.log("id:", id);
  console.log("chatData: ", chatData);

  return (
    <div className="flex min-h-screen antialiased text-gray-800">
      <Sidebar
        onSelectConversation={(selectedUserId) => setUserId(selectedUserId)}
      />
      <div className="flex w-full h-full overflow-x-hidden">
        {/* Yükleniyor göstergesi */}
        {conversationCreateLoading || isChatLoading ? (
          <div className="flex items-center justify-center w-full h-full translate-y-40">
            <LoadingSpinner />
          </div>
        ) : !conversationCreateData && !id ? (
          <div className="flex items-center justify-center w-full h-screen">
            <CreateConversation />
          </div>
        ) : (
          <div className="flex flex-col flex-auto h-screen p-6 border-r border-gray-700">
            <div className="flex flex-col flex-1 h-full p-4 text-white bg-black rounded-2xl">
              {id ? (
                <>
                  <div className="flex flex-col h-full mb-4 overflow-x-auto">
                    <div className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2 max-h-[640px]">
                        {messages?.length > 0 ? (
                          messages.map((message, idx) => (
                            <MessageItem
                              key={idx}
                              message={message.text}
                              owner={message.userId === user?._id}
                            />
                          ))
                        ) : (
                          <div className="flex items-center justify-center col-span-12 text-gray-400">
                            No messages
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Burada ChatInput bileşenini çağırıyoruz */}
                  <ChatInput inputRef={inputRef} handleSubmit={handleSubmit} />
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-screen">
                  <CreateConversation />
                </div>
              )}
            </div>
          </div>
        )}
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
