import * as dotenv from 'dotenv'
import {OpenAI} from "openai";
import axios from "axios";
import * as fs from 'fs';
import * as path from "path";
import {generateTitle} from "../lib/helpers";
import logger from "../logger/logger";

dotenv.config();
const openAI: OpenAI = new OpenAI();

const publicPath = "./src/public";

export async function handleCreatePainting(prompt: string) {
  try {
    const response = await openAI.images.generate({
      prompt: `Create a painting which has a title: "${prompt}". The painting should imitate style of paintings of Zdzislaw Beksinski`,
      n: 1,
      size: "512x512",
    });
    const filepath = path.join(
        process.cwd(),
        `${publicPath}`, "img", `${generateTitle(prompt)}.jpg`);
    const fileSrc = path.join("img", `${generateTitle(prompt)}.jpg`);
    await downloadImage(response?.data[0].url, filepath);

    return { imgSrc: response?.data[0].url, fileSrc };
  } catch (e: unknown) {
    logger.log("error", `Error: ${(e as {message: string}).message}`, {
      function: "handleCreatePainting()",
    });
  }
}

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



