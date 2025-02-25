import { useEffect, useState } from "react";
import { RenderIf } from "../common/RenderIf";
import { FaUser, FaUserCircle } from "react-icons/fa";

export const ChatPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleOutsideClick() {
      setIsOpen(false);
    }
    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed flex items-center justify-center w-12 h-12 text-white bg-black border-2 border-white rounded-full shadow-lg outline-none bottom-6 right-6 hover:bg-gray-800 focus:outline-none"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      <RenderIf condition={isOpen}>
        <div className="fixed bottom-[5.5rem] right-6 bg-black shadow-lg rounded-lg border border-gray-700 w-[350px] h-[500px] p-4 flex flex-col z-50">
          {/* Header */}
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200">Messages</h2>
          </div>

          {/* Chat Container */}
          <div className="flex-1 mt-4 space-y-4 overflow-y-auto">
            <MessageItem message="Merhaba, nasılsın?" sender="Ayşe" />
            <MessageItem message="İyiyim, sen nasılsın?" sender="You" />
            <MessageItem
              message="Bugün çok işim vardı ama fena değil."
              sender="Ayşe"
            />
            <MessageItem
              message="Bu akşam dışarı çıkıyor musun?"
              sender="You"
            />
          </div>

          <div className="mt-4">
            <form className="flex items-center space-x-2">
              <input
                className="flex-1 h-10 px-3 text-sm text-gray-300 placeholder-gray-500 bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-400"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

const MessageItem = ({
  message,
  sender,
}: {
  message: string;
  sender: string;
}) => {
  const isCurrentUser = sender === "You";

  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } gap-3 items-start`}
    >
      <div className="flex items-center justify-center w-5 h-5 text-white bg-gray-700 rounded-full">
        {isCurrentUser ? <FaUserCircle size={10} /> : <FaUser size={10} />}
      </div>

      <div>
        <p
          className={`text-sm font-medium ${
            isCurrentUser ? "text-blue-400" : "text-gray-200"
          }`}
        >
          {isCurrentUser ? "You" : sender}
        </p>
        <p
          className={`text-sm ${
            isCurrentUser
              ? "text-gray-300 bg-blue-600 p-2 rounded-md"
              : "text-gray-400 bg-gray-800 p-2 rounded-md"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
