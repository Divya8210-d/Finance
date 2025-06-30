import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Progress = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async (fullMessages) => {
    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/track",
        { messages: fullMessages },
        { withCredentials: true }
      );
      const answer = res.data.data;
      setMessages((prev) => [...prev, { sender: "system", text: answer }]);
    } catch (error) {
      toast.error(error.response?.data?.message||"Failed to get AI response");
    }
  };

  const sendMessage = async () => {
    if (question.trim() === "") return;

    const newUserMessage = { role: "user", content: question };

    const updatedMessages = [
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: typeof m.text === "string" ? m.text : JSON.stringify(m.text),
      })),
      newUserMessage,
    ];

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setQuestion("");
    await getAnswer(updatedMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full mx-auto p-4 font-inter bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <ToastContainer position="top-right" />

      {/* Welcome */}
      <motion.div
        className="bg-orange-100 dark:bg-orange-800 p-4 rounded-lg shadow-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p>
          Hey!! I'm your Financial Assistant. You can ask me anything related
          to your expenses or savings.
        </p>
      </motion.div>

      {/* Chat Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[600px] overflow-y-auto border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-white dark:bg-gray-800 shadow-md mb-4 max-w-7xl"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block px-3 py-2 rounded-lg max-w-[70%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-orange-400 text-white dark:bg-orange-600"
                    : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                }`}
              >
                {typeof msg.text === "string" ? (
                  msg.text
                ) : Array.isArray(msg.text) ? (
                  msg.text.map((block, i) => {
                    switch (block.type) {
                      case "heading":
                        return (
                          <div
                            key={i}
                            className="font-bold text-lg mb-1 dark:text-orange-300"
                          >
                            {block.content}
                          </div>
                        );
                      case "paragraph":
                        return (
                          <p key={i} className="mb-2">
                            {block.content}
                          </p>
                        );
                      case "list":
                        return (
                          <ul key={i} className="list-disc pl-5 mb-2">
                            {block.items?.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        );
                      default:
                        return (
                          <p key={i}>
                            {block?.content || JSON.stringify(block)}
                          </p>
                        );
                    }
                  })
                ) : (
                  <p>{JSON.stringify(msg.text)}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative max-w-7xl"
      >
     <input
  type="text"
  className="w-full pr-20 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-6 text-sm bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={handleKeyPress}
  placeholder="Type your message..."
  spellCheck={false}
  autoComplete="off"
/>
<motion.button
  onClick={sendMessage}
  className="absolute top-1/2  right-2 bg-orange-600 dark:bg-orange-500 text-white px-4 text-sm rounded-md hover:bg-orange-500 dark:hover:bg-orange-400 py-2"
>
  Send
</motion.button>
      </motion.div>
    </div>
  );
};

export default Progress;
