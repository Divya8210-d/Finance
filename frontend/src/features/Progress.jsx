import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Progress = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async (userQuestion) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/track",
        { question: userQuestion },
        { withCredentials: true }
      );
      const answer = res.data.data;
      setMessages((prev) => [...prev, { sender: "system", text: answer }]);
    } catch (error) {
      console.error("Error getting answer:", error);
      toast.error("Failed ");
    }
  };

  const sendMessage = async () => {
    if (question.trim() === "") return;
    const userMessage = question;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setQuestion("");
    await getAnswer(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full mx-auto p-4 font-inter">
      <ToastContainer position="top-right" />

      {/* Welcome Text */}
      <motion.div
        className="text-black dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 text-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p>Hey!! I'm your Financial Assistant. You can ask me any question regarding your expenses.</p>
      </motion.div>

      {/* Message Display Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[600px] overflow-y-auto border p-3 rounded-md bg-white shadow-md mb-4 max-w-7xl"
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
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {typeof msg.text === "string" ? (
                  msg.text
                ) : Array.isArray(msg.text) ? (
                  msg.text.map((block, i) => {
                    switch (block.type) {
                      case "heading":
                        return (
                          <div key={i} className="font-bold text-lg mb-1">
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
                            {block.items?.map((item, j) => <li key={j}>{item}</li>)}
                          </ul>
                        );
                      default:
                        return <p key={i}>{block?.content || JSON.stringify(block)}</p>;
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

      {/* Input Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative max-w-7xl"
      >
        <input
          type="text"
          className="w-full pr-20 border rounded-md px-3 py-6 text-sm"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <motion.button
          onClick={sendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-orange-600 text-white px-4 text-sm rounded-md hover:bg-orange-500 h-[calc(100%-30px)]"
        >
          Send
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Progress;
