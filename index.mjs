import express from "express";
import * as cheerio from 'cheerio'
import router from "./routes/index.mjs";

import {handlePaintingsTable, selectImagesByDate} from "./db/database.mjs";
import axios from "axios";

const app = express();
const PORT = 7070;
handlePaintingsTable();


// async function  getPage(url) {
//     const html = await axios(url)
//     const $ = cheerio.load(html.data);
//     const koko = $('h3').eq(0).text()
//     console.log("koko", koko)
// }

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

// getPage('https://www.nytimes.com/')

