import * as dotenv from "dotenv";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { countries, generateTitle } from "../lib/helpers";
import logger from "../logger/logger";
import { CountriesCodes } from "../models/countries-codes.enum";
import { PromptStyle } from "../models/prompt-style.enum";

dotenv.config();

const publicPath = "./src/public";

export async function handleCreatePainting(
  headlineTitle: string,
  countryCode: CountriesCodes,
  promptStyle: PromptStyle = PromptStyle.REGULAR
) {
  try {
    const data = {
      key: process.env.STABLE_DIFFUSION_API_KEY,
      prompt: handlePrompt(headlineTitle, countryCode, promptStyle),
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
    const title = `${generateTitle(
      headlineTitle
    )}-${promptStyle.toLowerCase()}.png`;
    const filepath = path.join(process.cwd(), `${publicPath}`, "img", title);
    const fileSrc = path.join("img", title);
    await downloadImage(response?.data?.output[0], filepath);

    return { imgSrc: response?.data?.output[0], fileSrc };
  } catch (e: unknown) {
    console.log("e", e);
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

function handlePrompt(
  headlineTitle: string,
  countryCode: CountriesCodes,
  promptStyle: PromptStyle
): string {
  if (promptStyle === PromptStyle.BEKSINSKI) {
    return `A hyper-realistic image inspired by the news headline: '${headlineTitle}.' The image should depict a scene or concept related to the headline, with a high level of detail, realism  and artistic interpretation. The image should be in style of Zdzislaw Beksinski paintings. The image should be influenced by the visual heritage of ${countries[countryCode]} country.`;
  }
  if (promptStyle === PromptStyle.DALI) {
    return `A hyper-realistic image inspired by the news headline: '${headlineTitle}.' The image should depict a scene or concept related to the headline, with a high level of detail, realism  and artistic interpretation. Feel free to use your creative freedom in generating this image. The image should be influenced by the visual heritage of ${countries[countryCode]} country.`;
  }
  return `A hyper-realistic image inspired by the news headline: '${headlineTitle}.' The image should depict a scene or concept related to the headline, with a high level of detail, realism  and artistic interpretation. Feel free to use your creative freedom in generating this image. The image should be influenced by the visual heritage of ${countries[countryCode]} country.`;
}
