import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config";
import database from "./db";
import { appRouter } from "./router";

const app = express();

app.use(bodyParser.json());
app.use(cors());

appRouter(app);

database.connect(() => {
  app.listen(config.PORT, () => {
    console.log(`App started running on http://localhost:${config.PORT}`);
  });
});
