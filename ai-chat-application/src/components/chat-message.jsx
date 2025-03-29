const ChatMessage = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
    return (
      <div className={`chat-message ${message.sender}`}>
        <div className="message-bubble">
          <div className="message-content">{message.text}</div>
        </div>
        <div className="timestamp">{formattedTime}</div>
      </div>
    );
  };

export default ChatMessage;