import { handleCreatePainting } from "../ai/handleCreatePainting.mjs";
import { saveImgDataToDb } from "./database.mjs";
import { currentDate } from "../lib/helpers.mjs";
import { getNewsTitles } from "../scrape-news/index.mjs";
import dayjs from "dayjs";
import logger from "../logger/logger.mjs";

async function saveNewsImages() {
  const newsTitles = await getNewsTitles();

  logger.log("info", `News data: ${JSON.stringify(newsTitles)}`, {
    function: "saveNewsImages()",
  });
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
  // await saveNewsImages();

  setInterval(async () => {
    logger.log("info", `Current hour: ${dayjs().hour()}`, {
      function: "handleSaveNewsImages()",
    });
    logger.log("info", `Current time: ${dayjs()}`, {
      function: "handleSaveNewsImages()",
    });

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
