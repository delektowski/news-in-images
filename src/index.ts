import * as express from "express";
import { Express } from "express";
import router from "./routes";
import { handleSaveNewsImages } from "./db/handleSaveNewsImages";
import { handleTableCreation } from "./db/database";
import * as path from 'path';

const publicPath = "./src/public";
const publicDistPath = "./dist/public";
const iconsCssPath = "./node_modules/flag-icons";
const viewsPath = "./src/views";

const app: Express = express();
const PORT = 5555;
handleTableCreation();
handleSaveNewsImages();
app.use(express.static(path.join(process.cwd(),
    `${publicPath}`)));
app.use(express.static(path.join(process.cwd(),
    `${publicDistPath}`)));
app.use(express.static(path.join(process.cwd(),
    `${iconsCssPath}`)));
app.set('views', path.join(process.cwd(),
    `${viewsPath}`));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
