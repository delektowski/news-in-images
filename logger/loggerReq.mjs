import { createLogger, format, transports } from "winston";

const { combine, prettyPrint } = format;

const loggerReq = createLogger({
  level: "info",
  format: combine(prettyPrint()),
  defaultMeta: { service: "news-in-images" },
  transports: [new transports.File({ filename: "./logs/logs-req.log" })],
});

loggerReq.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.prettyPrint()),
  })
);

export default loggerReq;
