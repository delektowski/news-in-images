import { chromium } from "playwright";
import logger from "../logger/logger";
import { NewsTitlesModel } from "./models/news-titles.model";
import { NewsSelectorDataModel } from "../models/newsSelectorData.model";
import { newsProvidersData } from "./news-providers";
import {refreshNewsProvidersData} from "./refresh-news-providers-data";

export async function getNewsTitles(
  newsDataNumber: number
): Promise<NewsTitlesModel[]> {
  const newsTitles: NewsTitlesModel[] = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (
    let currentNewsNumber = 1;
    currentNewsNumber <= newsDataNumber;
    currentNewsNumber++
  ) {
    if(newsProvidersData.length <= 1) {
      refreshNewsProvidersData();
    }

    if (newsProvidersData.length > 3) {
      try {
        await addNewsData(
          newsProvidersData.pop() as unknown as NewsSelectorDataModel,
          page,
          newsTitles
        );
      } catch (e) {
        logger.log("error", `Error on adding news data: ${(e as {message: string}).message}`, {
          function: "getNewsTitles()",
        });
        currentNewsNumber--;
      }
    }
  }
  await browser.close();
  logger.log("info", `News titles number: ${newsTitles.length}`, {
    function: "getNewsTitles()",
  });  
  logger.log("info", `News providers data number: ${newsProvidersData.length}`, {
    function: "getNewsTitles()",
  });
  return newsTitles;
}

async function addNewsData(
  item: NewsSelectorDataModel,
  page: any,
  newsTitles: NewsTitlesModel[]
) {
  const targetData = {
    subSelector: item.subSelector,
    linkSelector: item.linkSelector,
    newsProvider: item.newsProvider,
    country: item.country,
  };

  await page.goto(item.url);
  const newsData = await page.$$eval(
    item.mainSelector,
    async (
      element: any[],
      {
        subSelector,
        linkSelector,
        newsProvider,
        country,
      }: NewsSelectorDataModel
    ) => {
      const data: NewsTitlesModel[] = [];
      await element.forEach((item, index) => {
        if (index === 0) {
          const title: string = (item.querySelector(subSelector) as HTMLElement)
            ?.innerText;
          const link = (item.querySelector(linkSelector) as HTMLAnchorElement)
            ?.href;
          title && data.push({ title, newsProvider, country, link });
        }
      });
      return data;
    },
    targetData
  );
  if (newsData.length === 0) {
    throw new Error("No news data");
  }
  newsTitles.push(...newsData);
}


