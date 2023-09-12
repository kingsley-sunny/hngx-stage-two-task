import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { PersonModel } from "../Models/PersonModel";
import { checkIfValidUUID } from "../functions/function";
import { ApiResponse } from "../response/response";

export class PersonController {
  async create(req: Request<any, { name: string }>, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      console.log("🚀 ~~ file: controllers.ts:9 ~~ PersonController ~~ create ~~ name:", name);

      const existingPerson = await PersonModel.query().findOne({ name });

      if (existingPerson) {
        next(ApiResponse.makeErrorResponse("Name already exists"));
      }

      const person = await PersonModel.query().insertAndFetch({ name, id: randomUUID() });

      res.status(201).json(ApiResponse.makeSuccessResponse(person, "Successfully Created Person"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }

  async findAll(req: Request<any, any>, res: Response, next: NextFunction) {
    try {
      const persons = await PersonModel.query();

      res.status(200).json(ApiResponse.makeSuccessResponse(persons, "Persons successfully found"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }

  async findOne(req: Request<{ id: string }, any>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let person: PersonModel | undefined;

      if (checkIfValidUUID(id)) {
        person = await PersonModel.query().findOne("id", "=", id);
      } else {
        person = await PersonModel.query().findOne("name", "=", id);
      }

      if (!person) {
        return next(ApiResponse.makeErrorResponse("This person does not exists"));
      }

      res.status(200).json(ApiResponse.makeSuccessResponse(person, "Person successfully found"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }

  async update(req: Request<{ id: string }, { name: string }>, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      let person: PersonModel | undefined;

      if (checkIfValidUUID(id)) {
        person = await PersonModel.query().findOne({ id });
      } else {
        person = await PersonModel.query().findOne("name", "=", id);
      }

      if (!person) {
        next(ApiResponse.makeErrorResponse("This person does not exist"));
      }

      person = await PersonModel.query().patchAndFetchById((person as any).id, { name: name });

      res.status(201).json(ApiResponse.makeSuccessResponse(person, "Successfully Updated Person"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }

  async delete(req: Request<{ id: string }, any>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const person = await PersonModel.query().findOne("id", "=", id).orWhere("name", "=", id);

      if (!person) {
        return next(ApiResponse.makeErrorResponse("This person does not exists"));
      }

      res.status(200).json(ApiResponse.makeSuccessResponse(person, "Successfully deleted Person"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }
}
