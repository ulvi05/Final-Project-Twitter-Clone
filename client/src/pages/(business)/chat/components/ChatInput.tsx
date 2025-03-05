interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ChatInput = ({ inputRef, handleSubmit }: ChatInputProps) => {
  return (
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
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="relative w-full"
        >
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
        </form>
      </div>
      <div className="ml-4">
        <button
          type="submit"
          form="chat-form"
          className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-xl"
        >
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
  );
};
