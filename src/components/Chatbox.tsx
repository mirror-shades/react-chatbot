import React, { useState } from "react";
import "../App.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var index = 0;
const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = async () => {
    if (inputValue === "") return;

    setMessages([...messages, inputValue]);
    setInputValue("");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputValue,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    console.log(response.data.choices[0].text);
    setMessages((messages) => [
      ...messages,
      response.data.choices[0].text ?? "Something went wrong",
    ]);
  };

  return (
    <div className="chatbox">
      <div className="chat-messages">
        <ul>
          {messages.map((message) => (
            <li key={index++}>{message}</li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
