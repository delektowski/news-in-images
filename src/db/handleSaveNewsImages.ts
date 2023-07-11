import { handleCreatePainting } from "../ai/handleCreatePainting";
import { saveImgDataToDb } from "./database";
import { currentDate } from "../lib/helpers";
import { getNewsTitles } from "../scrape-news";
import * as dayjs from "dayjs";
import logger from "../logger/logger";
import { refreshNewsProvidersData } from "../scrape-news/refresh-news-providers-data";

export async function handleSaveNewsImages() {
  const moreThanHalfHour = 3570000;
  refreshNewsProvidersData();
  await saveNewsImages(3);
  setInterval(async () => {
    if (dayjs().hour() === 7) {
      refreshNewsProvidersData();
      await saveNewsImages(3);
    }
  }, moreThanHalfHour);
}

async function saveNewsImages(numberOfImages = 3) {
  const newsTitles = await getNewsTitles(numberOfImages);
  console.log("newsTitles", newsTitles)
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
    }
    if (imgData === undefined) {
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
