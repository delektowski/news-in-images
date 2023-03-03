import express from "express";
import { selectImagesByDate } from "../db/database.mjs";
import { todayDate } from "../lib/helpers.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  selectImagesByDate(todayDate)
    .then((imgList) => {
      res.render("pages/index", { imgList });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("pages/index", { imgList: null });
    });
});

export default router;
