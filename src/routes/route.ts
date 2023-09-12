import express from "express";
import { PersonController } from "../controllers/controllers";

export const router = express.Router();
const personController = new PersonController();

router.post("/", personController.create);

router.get("/", personController.findAll);

router.get("/:id", personController.findOne);

router.put("/:id", personController.update);

router.delete("/", personController.delete);
