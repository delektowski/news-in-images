import { handleCreatePainting } from "../ai/handleCreatePainting";
import { saveImgDataToDb } from "./database";
import { currentDate, shuffleArrayOrder } from "../lib/helpers";
import { getNewsTitles, targetsData } from "../scrape-news";
import * as dayjs from "dayjs";
import logger from "../logger/logger";
import {
  dataARABNEWS,
  dataCHINADAILY,
  dataDEUTSCHEWELLE,
  dataHINDUSTANTIMES,
  dataLEMONDE,
  dataNYT,
  dataPAP,
  dataTASS,
  dataTELEGRAPH,
} from "../scrape-news/news-providers";

async function saveNewsImages(numberOfImages = 3) {
  const newsTitles = await getNewsTitles(numberOfImages);

  logger.log("info", `News length: ${newsTitles.length}`, {
    function: "saveNewsImages()",
  });
  let unsavedNews = 0;
  for (let item of newsTitles) {
    logger.log("info", `Country: ${item.country}`, {
      function: "COUNTRY",
    });
  }
  for (const newsTitle of newsTitles) {
    const imgData = await handleCreatePainting(newsTitle.title);
    console.log("imgData", imgData);

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
  console.log("unsavedNews: ", unsavedNews);
  if (unsavedNews > 0) {
    await saveNewsImages(unsavedNews);
  }
}

export async function handleSaveNewsImages() {
  const moreThanHalfHour = 3570000;


  setInterval(async () => {
    if (dayjs().hour() === 7) {
      targetsData.push(
          ...shuffleArrayOrder([
            dataPAP,
            dataNYT,
            dataTELEGRAPH,
            dataDEUTSCHEWELLE,
            dataLEMONDE,
            dataTASS,
            dataCHINADAILY,
            dataHINDUSTANTIMES,
            dataARABNEWS,
          ])
      );
      logger.log("info", `Condition for saving is TRUE: ${dayjs().hour()}`, {
        function: "handleSaveNewsImages()",
      });
      await saveNewsImages();
    }
  }, moreThanHalfHour);
}
