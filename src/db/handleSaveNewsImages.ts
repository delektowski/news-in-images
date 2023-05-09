import { handleCreatePainting } from "../ai/handleCreatePainting";
import { saveImgDataToDb } from "./database";
import { currentDate } from "../lib/helpers";
import { getNewsTitles } from "../scrape-news";
import * as dayjs from 'dayjs';
import logger from "../logger/logger";

async function saveNewsImages() {
  const newsTitles = await getNewsTitles();

  logger.log("info", `News length: ${newsTitles.length}`, {
    function: "saveNewsImages()",
  });

  for (let item of newsTitles) {
    logger.log("info", `Country: ${item.country}`, {
      function: "COUNTRY",
    });
  }
  for (const newsTitle of newsTitles) {
    const imgData = await handleCreatePainting(newsTitle.title);
    if (imgData) {
      await saveImgDataToDb(
        newsTitle.title,
        newsTitle.newsProvider,
        newsTitle.country,
        currentDate(),
        imgData,
        newsTitle.link
      );
    }
  }
}

export async function handleSaveNewsImages() {
  const moreThanHalfHour = 3570000;

  setInterval(async () => {


    if (dayjs().hour() === 7) {
      logger.log(
        "info",
        `Condition for saving is TRUE: ${dayjs().hour()}`,
        {
          function: "handleSaveNewsImages()",
        }
      );
      await saveNewsImages();
    }
  }, moreThanHalfHour);
}
