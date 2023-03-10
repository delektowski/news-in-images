import dayjs from "dayjs";
import logger from "../logger/logger.mjs";

export function generateTitle(prompt) {
  return prompt.split(" ").splice(0, 5).join("-").toLowerCase();
}

export const currentDate = () => dayjs().format("YYYY-MM-DD");

export const isBeforeHour = () => dayjs().hour() < 7;

export const currentNewsDate = () => {
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
  return dayjs().format("YYYY-MM-DD");
};

export const formatMonthToString = (date) => {
  return dayjs(date).format('D MMMM YYYY')
}
