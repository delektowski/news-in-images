import { handleCreatePainting } from "../ai/handleCreatePainting";
import { saveImgDataToDb } from "./database";
import { currentDate } from "../lib/helpers";
import { getNewsTitles } from "../scrape-news";
import * as dayjs from "dayjs";
import logger from "../logger/logger";
import { refreshNewsProvidersData } from "../scrape-news/refresh-news-providers-data";
import { newsProvidersData } from "../scrape-news/news-providers";

export async function handleSaveNewsImages() {
  const moreThanHalfHour = 3570000;
      await saveNewsImages(1);
  setInterval(async () => {
    if (dayjs().hour() === 7) {
      await saveNewsImages(3);
    }
  }, moreThanHalfHour);
}

async function saveNewsImages(numberOfImages = 3) {
  if (newsProvidersData.length <= 3) {
    logger.log(
        "info",
        `newsProvidersData on ${dayjs().hour()} items number: ${JSON.stringify(newsProvidersData)}`,
        {
          function: "handleSaveNewsImages()",
        }
    );
    refreshNewsProvidersData();
    logger.log(
        "info",
        `After refresh newsProvidersData on ${dayjs().hour()} items number: ${newsProvidersData.length}`,
        {
          function: "handleSaveNewsImages()",
        }
    );
  }
  const newsTitles = await getNewsTitles(numberOfImages);
  let unsavedNews = 0;
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
    } else {
      unsavedNews++;
    }
  }
  logger.log(
    "info",
    `UnsavedNews on ${dayjs().hour()} number: ${unsavedNews}`,
    {
      function: "handleSaveNewsImages()",
    }
  );
  if (unsavedNews > 0) {
    await saveNewsImages(unsavedNews);
  }
}
