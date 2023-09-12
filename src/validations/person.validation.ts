import { NextFunction, Request } from "express";
import { ApiResponse } from "../response/response";

export class PersonValidation {
  static async validateName(
    req: Request<any, any, { name: string }>,
    res: ApiResponse,
    next: NextFunction
  ) {
    // if there is no name is the request body we throw an error
    if (!req.body.name) {
      return next(ApiResponse.makeErrorResponse("Name is required"));
    }

    const { name } = req.body;

    // => we check if name is not a string, we throw an error
    if (typeof name !== "string") {
      return next(ApiResponse.makeErrorResponse("Name must be a type of string"));
    }

    next();
  }

  static async validateParams(
    req: Request<{ id: string }, any>,
    res: ApiResponse,
    next: NextFunction
  ) {
    // => we check if the id is a number, we throw an error
    const paramToNumber = Number(req.params.id);

    if (!Number.isNaN(paramToNumber)) {
      return next(ApiResponse.makeErrorResponse("Id or name must be a type of string"));
    }

    next();
  }
}
