import { useState, useRef, useEffect } from "react";
import ChatInput from "./chat-input";
import ChatMessage from "./chat-message";
import sendMessage from "../features/send-message";

const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading])

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }))

      const botResponse = await sendMessage(text, conversationHistory)
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat Application</h1>
      </header>

      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        ref={inputRef}
      />

    </div>
  );
};

export default ChatApp
