import * as dotenv from "dotenv";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import {countries, generateTitle} from "../lib/helpers";
import logger from "../logger/logger";
import {CountriesCodes} from "../models/countries-codes.enum";

dotenv.config();

const publicPath = "./src/public";

export async function handleCreatePainting(prompt: string, countryCode: CountriesCodes) {
  try {
    const data = {
      key: process.env.STABLE_DIFFUSION_API_KEY,
      prompt: `A hyper-realistic image inspired by the news headline: '${prompt}.' The image should depict a scene or concept related to the headline, with a high level of detail, realism  and artistic interpretation. Feel free to use your creative freedom in generating this image. The image should be influenced by the visual heritage of ${countries[countryCode]} country.`,
      negative_prompt: "nude content, country flags, text, letters",
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      seed: null,
      guidance_scale: 7.5,
      safety_checker: "yes",
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    };

    const response = await axios.post(
      "https://stablediffusionapi.com/api/v3/text2img",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const filepath = path.join(
      process.cwd(),
      `${publicPath}`,
      "img",
      `${generateTitle(prompt)}.png`
    );
    const fileSrc = path.join("img", `${generateTitle(prompt)}.png`);
    await downloadImage(response?.data?.output[0], filepath);

    return { imgSrc: response?.data?.output[0], fileSrc };
  } catch (e: unknown) {
    logger.log(
      "error",
      `Error: ${(e as { message: string }).message}
        `,
      {
        function: "handleCreatePainting()",
      }
    );
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
