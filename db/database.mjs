import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/paintings.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the paintings database.");
});

export function handlePaintingsTable() {
    db.serialize(() => {
        db.run(
            "CREATE TABLE IF NOT EXISTS paintings ( id INTEGER PRIMARY KEY, title TEXT, date varchar(40), imgSrc TEXT)"
        );
    });
}

export function saveImgDataToDb(prompt, date, imgData) {

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO paintings (title,date,imgSrc) VALUES (?,?,?)`,
            [prompt, date, imgData.fileSrc],
            function (err) {
                if (err) {
                    return reject(err)
                }
                console.log(`A row has been inserted with rowId ${this.lastID}`);
                return resolve(imgData.fileSrc)
            }
        )
    })
}

export function selectImagesByDate(date) {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM paintings WHERE date = ?',
            [date],
            function (err, row) {
                if (err) {
                    return reject(err)
                }
                return resolve(row)
            }
        )
    })
}

