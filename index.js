import "./src/helpers/env.helper.js"
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import __dirname from "./utils.js";
import dbConnect from "./src/helpers/dbConnect.helper.js"
import cookieParser from "cookie-parser";
import argvsHerper from "./src/helpers/argvs.helper.js"
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port " + port + " and mode " + argvsHerper.mode);
  await dbConnect(process.env.LINK_DB);
};
server.listen(port, ready);

/* engine settings */
server.engine("handlebars", engine({
  layoutsDir: __dirname + "/src/views/layouts",
  partialsDir: __dirname + "/src/views/partials",
  defaultLayout: 'main'
}));
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares settings */
server.use(cookieParser(process.env.SECRET));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);