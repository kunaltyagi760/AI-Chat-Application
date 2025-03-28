import { forwardRef, useState } from "react";

const ChatInput = forwardRef(({ onSendMessage, isLoading }, ref) => {
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSendMessage(message);
      setMessage("");
    };
  
    return (
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isLoading? "Thinking" : "Ask anything"}
          disabled={isLoading}
        />
        <button disabled={isLoading} type="submit">Send</button>
      </form>
    );
  });
  
export default ChatInput;