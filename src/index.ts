import * as express from "express";
import { Express } from "express";
import router from "./routes";
import { handleSaveNewsImages } from "./db/handleSaveNewsImages";
import { handleTableCreation } from "./db/database";
import * as path from 'path';

const app: Express = express();
const PORT = 5555;
handleTableCreation();
handleSaveNewsImages();

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static("node_modules/flag-icons"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
