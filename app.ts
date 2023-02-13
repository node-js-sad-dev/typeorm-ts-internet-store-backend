import express from "express";
import dotenv from "dotenv";

import { AppDataSource } from "./src/db";

dotenv.config();

AppDataSource.initialize()
  .then(() => console.log("Db connected"))
  .catch((error) => {
    console.error(`Error during Data Source initialization: ${error.message}`);
  });

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
