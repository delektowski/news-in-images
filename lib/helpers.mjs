import dayjs from "dayjs";

export function generateTitle(prompt) {
  return prompt.split(" ").splice(0, 5).join("-").toLowerCase();
}

export const currentDate = () => dayjs().format("YYYY-MM-DD");

export const isBeforeHour = () => dayjs().hour() < 7;

export const currentNewsDate = () => {
  if (isBeforeHour()) {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  return dayjs().format("YYYY-MM-DD");
};

export const formatMonthToString = (date) => {
  return dayjs(date).format('D MMMM YYYY')
}
