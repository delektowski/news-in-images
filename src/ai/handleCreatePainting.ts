import * as dotenv from 'dotenv'
import {Configuration, OpenAIApi} from "openai";
import axios from "axios";
import * as fs from 'fs';
import * as path from "path";
import {generateTitle} from "../lib/helpers";
import logger from "../logger/logger";

dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const opeanai: OpenAIApi = new OpenAIApi(configuration);

const devPath = "./src/public";
const prodPath = "../src/public";

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
    const filepath = path.join(
        process.cwd(),
        `${process.env.NODE_ENV==="production" ? prodPath : devPath}`, "img", `${generateTitle(prompt)}.jpg`);
    const fileSrc = path.join("img", `${generateTitle(prompt)}.jpg`);
    await downloadImage(response?.data?.data[0]?.url, filepath);

    return { imgSrc: response.data.data[0].url, fileSrc };
  } catch (e: unknown) {
    logger.log("error", `Error: ${(e as {message: string}).message)}`, {
      function: "handleCreatePainting()",
    });
  }
}
