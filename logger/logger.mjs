import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint } = format;
import dayjs from "dayjs";

const logger = createLogger({
  level: "info",
    format: combine(
        label({ label: `${dayjs()}` }),
        prettyPrint()
    ),
  defaultMeta: { service: "news-in-images" },
  transports: [new transports.File({ filename: "./logs/logs.log" })],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);

export default logger;
