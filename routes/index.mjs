import express from "express";
import { selectImagesByDate } from "../db/database.mjs";
import { currentNewsDate, formatMonthToString } from "../lib/helpers.mjs";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("currentNewsDate()", currentNewsDate())
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
