import { handleCreatePainting } from "../ai/handleCreatePainting.mjs";
import { saveImgDataToDb } from "./database.mjs";
import { todayDate } from "../lib/helpers.mjs";
import { getNewsTitles } from "../scrape-news/index.mjs";

export async function handleSaveNewsImages() {
  const newsTitles = await getNewsTitles();
  console.log("newsTitles", newsTitles);

  for (const newsTitle of newsTitles) {
    const imgData = await handleCreatePainting(newsTitle.title);
    if (imgData) {
      await saveImgDataToDb(
        newsTitle.title,
        newsTitle.newsProvider,
        newsTitle.country,
        todayDate,
        imgData
      );
    }
  }
}
