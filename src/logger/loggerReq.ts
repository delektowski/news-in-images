import { createLogger, format, transports } from "winston";
import * as path from "path";

const { combine, prettyPrint } = format;

const devLoggerReqPath = "./src/logs/logs-req.log";
const prodLoggerReqPath = "../src/logs/logs-req.log";

const loggerReq = createLogger({
  level: "info",
  format: combine(prettyPrint()),
  defaultMeta: { service: "news-in-images" },
  transports: [
    new transports.File({
      filename: path.join(
        process.cwd(),
        `${
          process.env.NODE_ENV === "production"
            ? prodLoggerReqPath
            : devLoggerReqPath
        }`
      ),
    }),
  ],
});

loggerReq.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.prettyPrint()),
  })
);

export default loggerReq;
