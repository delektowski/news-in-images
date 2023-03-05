import express from "express";
import router from "./routes/index.mjs";
import { handleSaveNewsImages } from "./db/handleSaveNewsImages.mjs";
import { handleTableCreation } from "./db/database.mjs";

const app = express();
const PORT = 5555;

handleTableCreation();
handleSaveNewsImages();
app.use(express.static("public"));
app.use(express.static("node_modules/flag-icons"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
