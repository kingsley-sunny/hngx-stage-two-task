import express from "express";
import { PersonController } from "../controllers/controllers";
import { PersonValidation } from "../validations/person.validation";

export const router = express.Router();
const personController = new PersonController();


router.post("/",PersonValidation.validateName,  personController.create);

router.get("/", personController.findAll);

router.get("/:id", PersonValidation.validateParams, personController.findOne);

router.put("/:id", PersonValidation.validateParams, PersonValidation.validateName, personController.update);

router.delete("/:id", PersonValidation.validateParams,  personController.delete);
