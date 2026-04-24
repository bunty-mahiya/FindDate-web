import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { connectionSocket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getTimeString, getDayLabel } from "../utils/formatTime";

const Chat = () => {
  const { userId } = useParams();
  const loginUser = useSelector((store) => store.user);
  const loginUserId = loginUser?._id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!loginUserId) return;
    const socket = connectionSocket();
    socket.emit("joinChat", {
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      loginUserId,
      userId,
    });
    socket.on("receiveMessage", ({ firstName, text, lastName, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        { text, firstName, lastName, createdAt },
      ]);
    });
    return () => { socket.disconnect(); };
  }, [loginUser, userId]);

  useEffect(() => {
    const handleChat = async () => {
      const res = await axios.get(BASE_URL + "/chat/" + userId, {
        withCredentials: true,
      });
      const storeChat = res?.data?.message.map((val) => ({
        firstName: val?.senderId?.firstName,
        lastName: val?.senderId?.lastName,
        text: val?.text,
        createdAt: val?.createdAt,
      }));
      setMessages(storeChat);
    };
    handleChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = connectionSocket();
    socket.emit("sendMessage", {
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      loginUserId,
      userId,
      text: input,
    });
    setInput("");
  };

  // Day separator logic
  let lastDayLabel = null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0f0a] p-4">
      <div className="w-full max-w-xl flex flex-col h-130 rounded-2xl border border-green-900 bg-[#0f1a0f] overflow-hidden">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-green-900 bg-[#111f11]">
          <p className="text-sm font-medium text-green-100">Chat</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#0a0f0a]">
          {messages.map((msg, index) => {
            const dayLabel = getDayLabel(msg.createdAt);
            const showSeparator = dayLabel !== lastDayLabel;
            if (showSeparator) lastDayLabel = dayLabel;
            const isMine = msg.firstName === loginUser.firstName;

            return (
              <React.Fragment key={index}>
                {/* Day Separator */}
                {showSeparator && (
                  <div className="flex items-center gap-2 my-1">
                    <div className="flex-1 h-px bg-green-900" />
                    <span className="text-[10px] text-green-600 px-2">
                      {dayLabel}
                    </span>
                    <div className="flex-1 h-px bg-green-900" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`flex flex-col max-w-[75%] ${
                    isMine ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="text-[10px] text-gray-300 capitalize mb-1">
                    {msg.firstName} {msg.lastName}
                  </span>
                  <div
                    className={`px-4 py-2 text-sm leading-relaxed rounded-2xl ${
                      isMine
                        ? "bg-gradient-to-br from-green-900 to-green-700 text-green-100 border border-green-600 rounded-br-sm"
                        : "bg-gradient-to-br from-blue-900 to-blue-700 text-blue-100 border border-blue-600 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-300 mt-1">
                    {getTimeString(msg.createdAt)}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-3 border-t border-green-900 bg-[#111f11]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-[#0a0f0a] border border-green-900 focus:border-green-600 rounded-full px-4 py-2 text-sm text-green-100 placeholder-green-900 outline-none transition-all"
          />
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-full bg-green-900 hover:bg-green-800 border border-green-700 active:scale-95 flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4 fill-green-200" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;