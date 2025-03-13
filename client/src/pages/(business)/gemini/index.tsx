import { useState } from "react";
import { RiGeminiFill } from "react-icons/ri";
// import chatService from "@/services/chatService";

const GeminiPage = () => {
  const [history, setHistory] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    const updatedHistory = [...history, newMessage];

    setHistory(updatedHistory);
    setUserInput("");

    try {
      // const data = await chatService.sendMessage({
      //   prompt: userInput,
      //   history: updatedHistory,
      // });
      // const assistantMessage = { role: "assistant", content: data.response };
      // setHistory((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full h-[600px] flex flex-col shadow-lg bg-base-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center w-full gap-2 p-4 rounded-md bg-base-200">
          <RiGeminiFill className="text-4xl text-primary" />
          <h2 className="text-2xl font-bold">Gemini</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {history.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-base-300 text-base-content"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-md bg-base-200">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md input input-bordered"
          />
          <button
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="text-white rounded-sm btn btn-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiPage;
