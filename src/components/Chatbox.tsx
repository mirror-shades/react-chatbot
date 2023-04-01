import React, { useState } from "react";
import "../App.css";
import { Configuration, OpenAIApi } from "openai";
import Blinker from "./Blinker";
import blank from "../assets/blank.png";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var index = 0;
const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-3.5-turbo");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>(blank);
  const [typing, setTyping] = useState<boolean>(false);

  let maxToken = 4000;
  const handleSendMessage = async () => {
    if (inputValue === "") return;
    setMessages([...messages, inputValue]);
    setInputValue("");
    setTyping(true);
    const response = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: inputValue }],
      max_tokens: maxToken,
      stop: [" Human:", " AI:"],
    });
    setTyping(false);
    setMessages((messages) => [
      ...messages,
      response.data.choices[0].message?.content ?? "Something went wrong",
    ]);
    console.log(response.data);
  };

  const createImage = async () => {
    if (imagePrompt === "") return;
    setImagePrompt("");
    const response = await openai.createImage({
      prompt: imagePrompt,
      n: 1,
      size: "512x512",
    });
    const image_url = response.data.data[0].url;
    console.log(image_url);
    setImageLink(image_url ?? imageLink);
  };

  const handleChange = (event: any) => {
    setModel(event.target.value);
    if (event.target.value == "gpt-4") {
      maxToken = 8000;
    } else {
      maxToken = 4000;
    }
  };

  return (
    <div>
      <h1>AI tools</h1>
      <h2>AI Chat</h2>
      <label>
        Model{" "}
        <select value={model} onChange={handleChange}>
          <option value="gpt-3.5-turbo">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </label>
      <div className="chatbox">
        {" "}
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
          <button onClick={handleSendMessage} disabled={typing}>
            Send
          </button>
        </div>
      </div>
      <br />
      <h2>AI Image Generation</h2>
      <div className="chatbox">
        <div>
          <img src={imageLink} style={{ display: "block", margin: "auto" }} />
        </div>
        <div className="img-input">
          <input
            type="text"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
          />
          <button onClick={createImage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
