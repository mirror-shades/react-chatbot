import React, { useState } from "react";
import "../App.css";

const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = () => {
    if (inputValue === "") return;
    setMessages([...messages, inputValue]);
    setInputValue("");
    const response = fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputValue }),
    });
    console.log(response);
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbox;
