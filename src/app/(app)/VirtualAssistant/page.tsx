"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Initialize with given chat history

const initialMessages: Message[] = [
  { role: "user", content: "Who won the FIFA World Cup in 2018?" },
  {
    role: "assistant",
    content: "The French national team won the 2018 FIFA World Cup.",
  },
  { role: "user", content: "Who was their captain?" },
  {
    role: "assistant",
    content:
      "The French national team's captain during the 2018 FIFA World Cup was Hugo Lloris.",
  },
  { role: "user", content: "Who is Hugo Lloris" },
  {
    role: "assistant",
    content:
      "Hugo Lloris is a professional football (soccer) player from France who plays as a goalkeeper. He currently plays for Tottenham Hotspur in the English Premier League and has been the captain of the French national team for several years. Lloris has won numerous accolades throughout his career and is considered one of the top goalkeepers in the world.",
  },
];
export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  // Reference for the last message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];

    try {
      const res = await axios.post("/api/chat", { messages: updatedMessages });

      const aiMessage = res.data.choices[0].message;

      setMessages([...updatedMessages, aiMessage]); // Update chat history
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="w-full sm:w-[70%] max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 mb-24">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Virtual Assistant
      </h2>

      {/* Chat Messages */}
      <div className="h-[540px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-[#fffdf5] text-black"
                  : "bg-[#edf5e5] text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {/* Empty div to act as the scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="mt-4 flex gap-2 ">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI something..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-3 "
        />
        <Button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#edf5e5] text-black rounded-lg my-auto"
        >
          Ask
        </Button>
      </div>
    </div>
  );
}

// const initialMessages: Message[] = [
//   { role: "user", content: "Who won the FIFA World Cup in 2018?" },
//   {
//     role: "assistant",
//     content: "The French national team won the 2018 FIFA World Cup.",
//   },
//   { role: "user", content: "Who was their captain?" },
//   {
//     role: "assistant",
//     content:
//       "The French national team's captain during the 2018 FIFA World Cup was Hugo Lloris.",
//   },
//   { role: "user", content: "Who is Hugo Lloris" },
//   {
//     role: "assistant",
//     content:
//       "Hugo Lloris is a professional football (soccer) player from France who plays as a goalkeeper. He currently plays for Tottenham Hotspur in the English Premier League and has been the captain of the French national team for several years. Lloris has won numerous accolades throughout his career and is considered one of the top goalkeepers in the world.",
//   },
//   { role: "user", content: "Does china play cricket?" },
//   {
//     role: "assistant",
//     content:
//       "Yes, China does have a cricket team and is a member of the International Cricket Council (ICC). However, cricket is not a widely popular sport in China compared to other sports like basketball or football. The development of cricket in China is still at a grassroots level, and the national team is still working towards improving its performance on the international stage.",
//   },
// ];
