import { Configuration, OpenAIApi } from "openai";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
response = openai.Image.create_edit(
  (image = open("./assets/img1.png", "rb")),
  (mask = open("./assets/img2.png", "rb")),
  (prompt = "A big hairy gorrilla"),
  (n = 1),
  (size = "1024x1024")
);
image_url = response["data"][0]["url"];
console.log(image_url);
