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
    <div>
      <ul>
        {messages.map((message) => (
          <li key={index++}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbox;
