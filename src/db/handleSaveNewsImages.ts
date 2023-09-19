import { handleCreatePainting } from "../ai/handleCreatePainting";
import { saveImgDataToDb } from "./database";
import { currentDate } from "../lib/helpers";
import { getNewsTitles } from "../scrape-news";
import * as dayjs from "dayjs";
import logger from "../logger/logger";
import { refreshNewsProvidersData } from "../scrape-news/refresh-news-providers-data";
import { newsProvidersData } from "../scrape-news/news-providers";
import { NewsTitlesModel } from "../scrape-news/models/news-titles.model";
import { PromptStyle } from "../models/prompt-style.enum";

export async function handleSaveNewsImages() {
  const moreThanHalfHour = 3570000;
  setInterval(async () => {
    if (dayjs().hour() === 7) {
      await handleNewsTitles(6);
    }
  }, moreThanHalfHour);
}

async function handleNewsTitles(numberOfImages: number) {
  if (newsProvidersData.length <= 3) {
    refreshNewsProvidersData();
  }
  const newsTitles = await getNewsTitles(numberOfImages);

  if (newsTitles.length === numberOfImages) {
    await saveNewsImages(newsTitles);
  } else {
    await handleNewsTitles(numberOfImages);
  }
}

async function saveNewsImages(newsTitles: NewsTitlesModel[]) {
  let unsavedNews = 0;
  const notRecordedNews: NewsTitlesModel[] = [];
  for (const [index, newsTitle] of newsTitles.entries()) {
    const imgData = await handleCreatePainting(
      newsTitle.title,
      newsTitle.country,
      index === 2 || index === 5 ? PromptStyle.BEKSINSKI : PromptStyle.REGULAR
    );
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
      notRecordedNews.push(newsTitle);
    }
  }
  logger.log(
    "info",
    `UnsavedNews on ${dayjs().hour()} number: ${unsavedNews}`,
    {
      function: "handleSaveNewsImages()",
    }
  );
  if (notRecordedNews.length > 0) {
    setTimeout(async () => {
      await saveNewsImages(notRecordedNews);
    }, 5001);
  }
}
