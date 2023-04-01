import { Request, Response, Router } from "express";
import { selectImagesByDate } from "../db/database";
import {
  currentNewsDate,
  daysBeforeDate,
  formatMonthToString,
} from "../lib/helpers";
import loggerReq from "../logger/loggerReq";
import * as dayjs from "dayjs";
import logger from "../logger/logger";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  const ipAddress = req.socket.remoteAddress;
  loggerReq.log("info", `IP address: ${ipAddress} on: ${dayjs()}`, {
    function: "route: '/'",
  });

  selectImagesByDate(currentNewsDate())
    .then((imgList) => {
      res.render("pages/index", {
        imgList,
        currentNewsDate: formatMonthToString(currentNewsDate()),
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("pages/index", { imgList: null });
    });
});

router.post("/test", (req: Request, res: Response): void => {
  const { daysBefore } = req.body;
  logger.log("info", `Days before: ${daysBefore}`, {
    function: "daysBeforeAmount",
  });
  selectImagesByDate(daysBeforeDate(daysBefore))
    .then((imgList) => {
      res.json(imgList);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

export default router;
