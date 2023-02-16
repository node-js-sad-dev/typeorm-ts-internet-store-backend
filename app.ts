import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import { AppDataSource } from "./src/db";
import RootRouter from "./src/root.router";
import { errorHandler, routeNotFound } from "./src/middlewares/errorHandler";

AppDataSource.initialize()
  .then(async () => {
    console.log("Db connected");

    const app = express();

    const PORT = process.env.PORT || 3000;

    app.use(cors());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/static", express.static("static"));
    app.use("/api/v1", new RootRouter().router);

    app.use([routeNotFound, errorHandler]);

    app.listen(PORT, () => console.info("Server listening on port " + PORT));
  })
  .catch((error) => {
    console.error(`Error during Data Source initialization: ${error.message}`);
  });
