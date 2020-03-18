import { Router } from "express";
import { eventsController } from "./events.controller";
import {
  attendEventValidator,
  createEventValidator,
  createTaskValidator,
  updateTasksValidator
} from "./events.validations";

const eventsRouter = Router();

eventsRouter.post("/create", createEventValidator, eventsController.create);
eventsRouter.get("/all", eventsController.listAll);
eventsRouter.get("/:id", eventsController.findOne);
eventsRouter.get("/tasks/:eventId", eventsController.getTasks);
eventsRouter.post("/add-tasks", createTaskValidator, eventsController.addTask);
eventsRouter.put(
  "/update-tasks",
  updateTasksValidator,
  eventsController.updateTasks
);
eventsRouter.post(
  "/attend",
  attendEventValidator,
  eventsController.attendEvent
);

export { eventsRouter };
