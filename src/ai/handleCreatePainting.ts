import * as dotenv from 'dotenv'
import {Configuration, OpenAIApi} from "openai";
import axios from "axios";
import * as fs from 'fs';
import * as path from "path";
import {generateTitle} from "../lib/helpers";

dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const opeanai: OpenAIApi = new OpenAIApi(configuration);

async function downloadImage(url: string | undefined, filepath: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => {
        return resolve(filepath);
      });
  });
}


export async function handleCreatePainting(prompt: string) {
  try {
    const response = await opeanai.createImage({
      prompt: `${prompt} by Zdzislaw Beksinski`,
      n: 1,
      size: "512x512",
    });
    const filepath = path.join("public", "img", `${generateTitle(prompt)}.jpg`);
    const fileSrc = path.join("img", `${generateTitle(prompt)}.jpg`);
    await downloadImage(response?.data?.data[0]?.url, filepath);

    return { imgSrc: response.data.data[0].url, fileSrc };
  } catch (e: unknown) {
    console.log("ERROR:", (e as {message: string}).message);
  }
}
