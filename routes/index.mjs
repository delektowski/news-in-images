import express from "express";
import { selectImagesByDate } from "../db/database.mjs";
import { currentNewsDate, formatMonthToString } from "../lib/helpers.mjs";
import loggerReq from "../logger/loggerReq.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  const ipAddress = req.socket.remoteAddress;
  loggerReq.log("info", `IP address: ${ipAddress}`, {
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

export default router;
