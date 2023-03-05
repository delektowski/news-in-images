import dayjs from "dayjs";

export function generateTitle(prompt) {
  return prompt.split(" ").splice(0, 5).join("-").toLowerCase();
}

export const currentDate = () => dayjs().format("YYYY-MM-DD");

export const isBefore9am = () => dayjs().hour() < 8;

export const currentNewsDate = () => {
  if (isBefore9am()) {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  return dayjs().format("YYYY-MM-DD");
};

export const formatMonthToString = (date) => {
  return dayjs(date).format('D MMMM YYYY')
}
