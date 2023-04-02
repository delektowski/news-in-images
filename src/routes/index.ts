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
import { getLatestImgList } from "../services/getLatestImgList";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const ipAddress = req.socket.remoteAddress;
  loggerReq.log("info", `IP address: ${ipAddress} on: ${dayjs()}`, {
    function: "route: '/'",
  });

  try {
    res.render("pages/index", {
      imgList: await getLatestImgList(),
      currentNewsDate: formatMonthToString(currentNewsDate()),
    });
  } catch (err) {
    console.log("err", err);
    res.render("pages/index", { imgList: null });
  }
});

router.post("/test", async (req: Request, res: Response): Promise<void> => {
  const { daysBefore } = req.body;
  logger.log("info", `Days before: ${daysBefore}`, {
    function: "daysBeforeAmount",
  });
  try {
    const imgList = await selectImagesByDate(daysBeforeDate(daysBefore));
    res.json(imgList);
  } catch (err) {
    console.log("err", err);
  }
});

export default router;
