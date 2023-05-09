import * as dayjs from "dayjs";
import logger from "../logger/logger";
import {NewsSelectorDataModel} from "../models/newsSelectorData.model";

export function generateTitle(prompt: string): string {
  return prompt.split(" ").splice(0, 5).join("-").toLowerCase();
}

export const currentDate = (): string => dayjs().format("YYYY-MM-DD");

export const isBeforeHour = (): boolean => dayjs().hour() < 8;

export const currentNewsDate = (): string => {
  logger.log("info", `Current hour: ${dayjs().hour()}`, {
    function: "currentNewsDate()",
  });
  if (isBeforeHour()) {
    logger.log("info", `isBeforeHour TRUE on: ${dayjs().hour()}`, {
      function: "currentNewsDate()",
    });
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  logger.log("info", `isBeforeHour FALSE on: ${dayjs().hour()}`, {
    function: "currentNewsDate()",
  });
  return dayjs().subtract(0, "day").format("YYYY-MM-DD");
};

export const daysBeforeDate = (daysBefore: number): string => {
  logger.log("info", `Current hour: ${dayjs().hour()}`, {
    function: "daysBeforeDate()",
  });

  return dayjs().subtract(daysBefore, "day").format("YYYY-MM-DD");
};

export const formatMonthToString = (date: string): string => {
  return dayjs(date).format("D MMMM YYYY");
};

export const shuffleArrayOrder = (arr: NewsSelectorDataModel[]): NewsSelectorDataModel[] => {
  return arr
    .map((value: NewsSelectorDataModel) => ({ value, sort: Math.random() }))
    .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
    .map(({ value }) => value);
}


