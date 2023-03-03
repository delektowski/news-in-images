import express from "express";
import router from "./routes/index.mjs";
import { handleTableCreation } from "./db/handleTableCreation.mjs";
import { handleSaveNewsImages } from "./db/handleSaveNewsImages.mjs";

const app = express();
const PORT = 7070;

handleTableCreation();
handleSaveNewsImages();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
