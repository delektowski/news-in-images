import { Request, Response, Router } from "express";
import { selectImagesByDate } from "../db/database";
import { currentNewsDate, formatMonthToString } from "../lib/helpers";
import loggerReq from "../logger/loggerReq";
import * as dayjs from 'dayjs';

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

  console.log("req23A", req.body)
  selectImagesByDate(currentNewsDate())
    .then((imgList) => {
      res.json(imgList)
    })
    .catch((err) => {
      console.log("err", err);

    });

});

export default router;
