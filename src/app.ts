import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import Knex from "knex";
import { Model } from "objection";
import { ApiResponse } from "./response/response";
import { router } from "./routes/route";

const knexConfig = require("../knexfile");

const app = express();
const knex = Knex(knexConfig.development);

// use enable CORS for all request
app.use(cors());

config();

app.use(bodyParser.json());

app.use("/api", router);

app.use(
  (
    error: ReturnType<typeof ApiResponse.makeErrorResponse>,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!error.success) {
      const err = ApiResponse.makeErrorResponse(error.message, error.statusCode);

      return res.status(err.statusCode).json(err);
    }
    return res.status(error.statusCode).json(error);
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json(ApiResponse.makeErrorResponse("The route does not exists"));
});

// connects the database
Model.knex(knex);

app.listen(process.env.PORT, () => {
  console.log("listening on port");
});
