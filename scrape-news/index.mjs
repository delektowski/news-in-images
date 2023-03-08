import playwright from "playwright";
import {
  dataARABNEWS,
  dataCHINADAILY,
  dataDEUTSCHEWELLE, dataHINDUSTANTIMES,
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
    dataCHINADAILY,
    dataHINDUSTANTIMES,
    dataARABNEWS
  ];
  const newsTitles = [];
  const browser = await playwright.chromium.launch();
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
      async (element, { subSelector,linkSelector, newsProvider, country }) => {
        const data = [];
        await element.forEach((item, index) => {
          if (index === 0) {
            const title = item.querySelector(subSelector)?.innerText;
            const link = item.querySelector(linkSelector)?.href;
            title && data.push({ title, newsProvider, country,link });
          }
        });
        return data;
      },
      targetData
    );
    newsTitles.push(newsData);
  }
  await browser.close();
  return newsTitles.flat();
}


