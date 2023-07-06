import { Database } from "sqlite3";
import logger from "../logger/logger";
import * as path from "path";
import * as dayjs from 'dayjs';
import {ImgData} from "../models/ImageData.model";



const dbPath = "./src/db/paintings.db";
const db = new Database(
  path.join(
    process.cwd(),
    `${dbPath}`
  ),
  (err) => {
    if (err) {
      console.error(err.message);
      logger.log("error", `Not connected. Error: ${err.message}`, {
        function: "new Database()",
      });
      return;
    }
    logger.log("info", `Connected to the paintings database on: ${dayjs()}`, {
      function: "new Database()",
    });
  }
);

export function handleTableCreation() {
  return new Promise<void>((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS paintings ( id INTEGER PRIMARY KEY, title TEXT, newsProvider TEXT, country TEXT, date varchar(40), imgSrc TEXT, link TEXT)",
      function (err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  });
}

export function saveImgDataToDb(
  title: string,
  newsProvider: string,
  country: string,
  date: string,
  imgData: { fileSrc: string },
  link: string
) {
  logger.log(
    "info",
    `title: ${title}; newsProvider: ${newsProvider}; country: ${country}; date: ${date}; link: ${link}; `,
    {
      function: "saveImgDataToDb()",
    }
  );
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO paintings (title,newsProvider,country,date,imgSrc,link) VALUES (?,?,?,?,?,?)`,
      [title, newsProvider, country, date, imgData.fileSrc, link],
      function (err) {
        if (err) {
          return reject(err);
        }
        console.log(`A row has been inserted with rowId ${this.lastID}`);
        return resolve(imgData.fileSrc);
      }
    );
  });
}

export function selectImagesByDate(date: string): Promise<ImgData[]> {

  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM paintings WHERE date = ?", [date], (err, row) => {
      if (err) {
        return reject(err);
      }
      return resolve(row);
    });
  });
}
