import { createLogger, format, transports } from "winston";
import * as path from "path";

const { combine, timestamp, label, prettyPrint } = format;

const devLoggerPath = "./src/logs/logs.log";
const prodLoggerPath = "../src/logs/logs.log";

const logger = createLogger({
  level: "info",
  format: combine(prettyPrint()),
  defaultMeta: { service: "news-in-images" },
  transports: [new transports.File({ filename: path.join(process.cwd(),
        `${process.env.NODE_ENV==="production" ? prodLoggerPath : devLoggerPath}`) })],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.prettyPrint()),
  })
);

export default logger;
