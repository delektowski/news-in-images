import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/paintings.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the paintings database.");
});

export function handleTableCreation() {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS paintings ( id INTEGER PRIMARY KEY, title TEXT, newsProvider TEXT, country TEXT, date varchar(40), imgSrc TEXT)",
      function (err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  });
}

export function saveImgDataToDb(title, newsProvider, country, date, imgData) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO paintings (title,newsProvider,country,date,imgSrc) VALUES (?,?,?,?,?)`,
      [title, newsProvider, country, date, imgData.fileSrc],
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

export function selectImagesByDate(date) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM paintings WHERE date = ?", [date], (err, row) => {
      if (err) {
        return reject(err);
      }
      return resolve(row);
    });
  });
}
