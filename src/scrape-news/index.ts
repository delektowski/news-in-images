import { chromium } from "playwright";
import {
  dataTASS,
  dataNYT,
  dataDEUTSCHEWELLE,
  dataPAP,
  dataTELEGRAPH,
  dataLEMONDE,
  dataCHINADAILY, dataHINDUSTANTIMES, dataARABNEWS
} from "./news-providers";
import logger from "../logger/logger";
import { NewsTitlesModel } from "./models/news-titles.model";
import { NewsSelectorDataModel } from "../models/newsSelectorData.model";
import { shuffleArrayOrder } from "../lib/helpers";
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
  newsTitles.push(...newsData);
}

export async function getNewsTitles(newsDataNumber = 3): Promise<NewsTitlesModel[]> {

  const newsTitles: NewsTitlesModel[] = [];
  const targetsData: NewsSelectorDataModel[] = shuffleArrayOrder([
    dataPAP,
    dataNYT,
    dataTELEGRAPH,
    dataDEUTSCHEWELLE,
    dataLEMONDE,
    dataTASS,
    dataCHINADAILY,
    dataHINDUSTANTIMES,
    dataARABNEWS
  ]);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (
    let currentNewNumber = 0;
    currentNewNumber < newsDataNumber;
    currentNewNumber++
  ) {
    if (targetsData.length > 0) {
      await addNewsData(
        targetsData.pop() as unknown as NewsSelectorDataModel,
        page,
        newsTitles
      );
    }
  }
  await browser.close();
  logger.log("info", `News titles number: ${newsTitles.length}`, {
    function: "getNewsTitles()",
  });

  return newsTitles;
}
