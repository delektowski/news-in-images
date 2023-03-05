import { handleCreatePainting } from "../ai/handleCreatePainting.mjs";
import { saveImgDataToDb } from "./database.mjs";
import { currentDate } from "../lib/helpers.mjs";
import { getNewsTitles } from "../scrape-news/index.mjs";
import dayjs from "dayjs";

async function saveNewsImages() {
  const newsTitles = await getNewsTitles();

  for (const newsTitle of newsTitles) {
    console.log("newsTitle", newsTitle);
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
  const oneHour = 3600000;
  await saveNewsImages();
  setInterval(async () => {
    const currentDayHour = dayjs().hour();
    if (currentDayHour === 9) {
      await saveNewsImages();
    }
  }, oneHour);
}
