import { chromium } from "playwright";
import { dataLEMONDE, dataNYT, dataTELEGRAPH } from "./news-providers";
import logger from "../logger/logger";
import { NewsTitlesModel } from "./models/news-titles.model";

export async function getNewsTitles() {
  const targetsData = [
    // dataPAP,
    dataNYT,
    dataTELEGRAPH,
    // dataDEUTSCHEWELLE,
    dataLEMONDE,
    // dataTASS,
    // dataCHINADAILY,
    // dataHINDUSTANTIMES,
    // dataARABNEWS
  ];
  const newsTitles: NewsTitlesModel[] = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const item of targetsData) {
    const targetData = {
      subSelector: item.subSelector,
      linkSelector: item.linkSelector,
      newsProvider: item.newsProvider,
      country: item.country,
    };
    await page.goto(item.url);
    const newsData = await page.$$eval(
      item.mainSelector,
      async (element, { subSelector, linkSelector, newsProvider, country }) => {
        const data: NewsTitlesModel[] = [];
        await element.forEach((item, index) => {
          if (index === 0) {
            const title: string = (
              item.querySelector(subSelector) as HTMLElement
            )?.innerText;
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
  await browser.close();
  logger.log("info", `News titles: ${newsTitles}`, {
    function: "getNewsTitles()",
  });
  return newsTitles;
}
