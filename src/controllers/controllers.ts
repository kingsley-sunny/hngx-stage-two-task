import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { PersonModel } from "../Models/PersonModel";
import { checkIfValidUUID } from "../functions/function";
import { ApiResponse } from "../response/response";

export class PersonController {
  async create(req: Request<any, { name: string }>, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const existingPerson = await PersonModel.query().findOne({ name });

      if (existingPerson) {
        return next(ApiResponse.makeErrorResponse("Name already exists"));
      }

      const person = await PersonModel.query().insertAndFetch({ name, id: randomUUID() });

      res
        .status(201)
        .json(ApiResponse.makeSuccessResponse(person, "Successfully Created Person", 201));
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
        return next(ApiResponse.makeErrorResponse("This person does not exist"));
      }

      // if the name already exist
      const anotherPerson = await PersonModel.query().findOne({ name });

      if (anotherPerson) {
        return next(ApiResponse.makeErrorResponse("This person already exists"));
      }

      person = await PersonModel.query().patchAndFetchById((person as any).id, { name: name });

      res.json(ApiResponse.makeSuccessResponse(person, "Successfully Updated Person"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }

  async delete(req: Request<{ id: string }, any>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let person: PersonModel | undefined;

      if (checkIfValidUUID(id)) {
        person = await PersonModel.query().findOne({ id });
      } else {
        person = await PersonModel.query().findOne("name", "=", id);
      }

      if (!person) {
        return next(ApiResponse.makeErrorResponse("This person does not exists"));
      }

      const deleted = await PersonModel.query().deleteById((person as any).id);

      res.status(200).json(ApiResponse.makeSuccessResponse(deleted, "Successfully deleted Person"));
    } catch (error: any) {
      next(ApiResponse.makeErrorResponse(error.message));
    }
  }
}
