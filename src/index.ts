import * as express from "express";
import { Express } from "express";
import router from "./routes";
import { handleSaveNewsImages } from "./db/handleSaveNewsImages";
import { handleTableCreation } from "./db/database";
import * as path from 'path';

const devPublicPath = "./src/public";
const prodPublicPath = "../src/public";
const devViewsPath = "./src/views";
const prodViewsPath = "../src/views";
const devIconsCssPath = "./node_modules/flag-icons";
const prodIconsCssPath = "../node_modules/flag-icons";

const app: Express = express();
const PORT = 5555;
handleTableCreation();
handleSaveNewsImages();
app.use(express.static(path.join(process.cwd(),
    `${process.env.NODE_ENV==="production" ? prodPublicPath : devPublicPath}`)));
app.use(express.static(path.join(process.cwd(),
    `${process.env.NODE_ENV==="production" ? prodIconsCssPath  : devIconsCssPath}`)));
app.set('views', path.join(process.cwd(),
    `${process.env.NODE_ENV==="production" ? prodViewsPath : devViewsPath}`));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
