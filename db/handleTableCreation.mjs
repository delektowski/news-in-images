import sqlite3 from "sqlite3";

function createTable() {
  const db = new sqlite3.Database("./db/paintings.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS paintings ( id INTEGER PRIMARY KEY, title TEXT, date varchar(40), imgSrc TEXT)",
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve();
      }
    );
  });
}

export function handleTableCreation(req, res, next) {

  createTable()
}
