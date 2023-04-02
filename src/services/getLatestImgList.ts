import { selectImagesByDate } from "../db/database";
import { daysBeforeDate } from "../lib/helpers";
import { ImgData } from "../models/ImageData.model";

let daysBefore = 0;
let imgList;

export const getLatestImgList = async (): Promise<ImgData[]> => {
  imgList = await selectImagesByDate(daysBeforeDate(daysBefore));

  if (imgList.length === 0) {
    daysBefore++;
    await getLatestImgList();
  }

  return imgList;
};
