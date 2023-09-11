import * as dayjs from "dayjs";
import logger from "../logger/logger";
import { NewsSelectorDataModel } from "../models/newsSelectorData.model";

export function generateTitle(prompt: string): string {
  return prompt
    .replace(/[^a-zA-Z0-9\s\-/]/g, '')
    .split(" ")
    .splice(0, 5)
    .join("-")
    .toLowerCase();
}

export const currentDate = (): string => dayjs().format("YYYY-MM-DD");

export const isBeforeHour = (): boolean => dayjs().hour() < 8;

export const currentNewsDate = (): string => {
  if (isBeforeHour()) {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  return dayjs().subtract(0, "day").format("YYYY-MM-DD");
};

export const daysBeforeDate = (daysBefore: number): string => {
  return dayjs().subtract(daysBefore, "day").format("YYYY-MM-DD");
};

export const formatMonthToString = (date: string): string => {
  return dayjs(date).format("D MMMM YYYY");
};

export const shuffleArrayOrder = (
  arr: NewsSelectorDataModel[]
): NewsSelectorDataModel[] => {
  return arr
    .map((value: NewsSelectorDataModel) => ({ value, sort: Math.random() }))
    .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
    .map(({ value }) => value);
};
