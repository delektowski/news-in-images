import express from "express";
import {saveImgDataToDb, selectImagesByDate} from "../db/database.mjs";
import {handleCreatePainting} from "../ai/handleCreatePainting.mjs";
import {todayDate} from "../lib/helpers.mjs";

const router = express.Router();

let prompt = '';

router.get("/", (req, res) => {

    selectImagesByDate(todayDate).then(imgList => {
        res.render("pages/index", {imgSrc: null, prompt, imgList});

    }).catch(err => {
        console.log("err", err)
        res.render("pages/index", {imgSrc: null, prompt});
    })

});

router.post("/", async (req, res) => {
    prompt = req.body?.prompt;

    if (prompt) {
        const imgData = await handleCreatePainting(prompt);
        const imgSrc = await saveImgDataToDb(prompt, todayDate, imgData);
        res.render("pages/index", {imgSrc, prompt, imgList: null});
    }
});

export default router;
