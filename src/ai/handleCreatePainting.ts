import * as dotenv from 'dotenv'
import {OpenAI} from "openai";
import axios from "axios";
import * as fs from 'fs';
import * as path from "path";
import {generateTitle} from "../lib/helpers";
import logger from "../logger/logger";

dotenv.config();
const openAI: OpenAI = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const publicPath = "./src/public";

export async function handleCreatePainting(prompt: string) {
  try {
    const response = await openAI.images.generate({
      prompt: `Generate a hyper-realistic image inspired by the news headline: ${prompt}. The image should depict a scene or concept related to the news story, with a high level of detail, realism, and artistic interpretation. Feel free to use your creative freedom in generating this image.`,
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



