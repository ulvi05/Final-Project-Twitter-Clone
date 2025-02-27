import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { PiOpenAiLogo } from "react-icons/pi";
// import { useSocket } from "@/hooks/use-socket";
// import { useAppSelector } from "@/hooks/main";
// import { selectUserData } from "@/store/features/userSlice";

export const ChatPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const socket = useSocket();
  // const { user, loading } = useAppSelector(selectUserData);
  const inputRef = useRef<HTMLInputElement>(null);
  // const id = getUserId(user);

  useEffect(() => {
    function handleOutsideClick() {
      setIsOpen(false);
    }
    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   if (!socket) return;
  //   e.preventDefault();
  //   const message = inputRef.current?.value.trim();
  //   if (!message) return;
  //   inputRef.current!.value = "";
  //   socket.emit("message", message, to: "user id");
  // };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed flex items-center justify-center w-12 h-12 text-white bg-black border border-white rounded-full shadow-lg outline-none bottom-6 right-6 hover:bg-gray-800 focus:outline-none"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <PiOpenAiLogo size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-[5.5rem] right-6 bg-black shadow-lg rounded-lg border border-gray-700 w-[350px] h-[500px] p-4 flex flex-col z-50">
          {/* Header */}
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200">Messages</h2>
          </div>

          {/* Chat Container */}
          <div className="flex-1 mt-4 space-y-4 overflow-y-auto">
            <MessageItem message="Hi, how are you today?" owner={false} />
            <MessageItem
              message="I'm doing great, thanks! What about you?"
              owner={true}
            />
            <MessageItem
              message="Pretty good, just busy with some work."
              owner={false}
            />
            <MessageItem
              message="Do you have any plans for tonight?"
              owner={true}
            />
            <MessageItem
              message="Pretty good, just busy with some work."
              owner={false}
            />
            <MessageItem
              message="Do you have any plans for tonight?"
              owner={true}
            />
          </div>

          {/* Input Section */}
          <div className="mt-4">
            <form
              // onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                className="flex-1 h-10 px-3 text-sm text-gray-300 placeholder-gray-500 bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

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
        "p-2 rounded-lg",
        owner ? "col-start-6 col-end-13" : "col-start-1 col-end-8"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          owner && "justify-start flex-row-reverse"
        )}
      >
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-white bg-indigo-500 rounded-full">
          {owner ? "Y" : "A"}
        </div>
        <div
          className={cn(
            "relative px-3 py-2 text-sm shadow rounded-xl",
            owner ? "bg-blue-500 mr-2" : "bg-[#2f3336] ml-2"
          )}
        >
          <div className="text-white">{message}</div>
        </div>
      </div>
    </div>
  );
};
