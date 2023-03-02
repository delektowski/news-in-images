import playwright from "playwright";
import {
  dataDEUTSCHEWELLE,
  dataLEMONDE,
  dataNYT,
  dataPAP,
  dataTASS,
  dataTELEGRAPH,
} from "./news-providers.mjs";

export async function getNewsTitles() {
  const targetsData = [
    dataPAP,
    dataNYT,
    dataTELEGRAPH,
    dataDEUTSCHEWELLE,
    dataLEMONDE,
    dataTASS,
  ];
  const newsTitles = [];
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  for (const item of targetsData) {
    const targetData = {
      subSelector: item.subSelector,
      newsProvider: item.newsProvider,
      country: item.country,
    };
    await page.goto(item.url);
    const newsData = await page.$$eval(
      item.mainSelector,
      async (element, { subSelector, newsProvider, country }) => {
        const data = [];
        await element.forEach((item, index) => {
          if (index === 0) {
            const title = item.querySelector(subSelector)?.innerText;
            title && data.push({ title, newsProvider, country });
          }
        });
        return data;
      },
      targetData
    );
    newsTitles.push(newsData);
  }
  await browser.close();
  return newsTitles;
}
