import { check, body } from "express-validator";

export const createEventValidator = [
  body("title").isString(),
  body("description").isString(),
  body("organizer").isString(),
  body("date").isString(),
  body("location").isString()
];

export const createTaskValidator = [
  check("eventId").isString(),
  check("tasks.*.text").isString()
];

export const updateTasksValidator = [
  body("*.id").isString(),
  body("*.eventId").isString(),
  body("*.taken")
    .isBoolean()
    .optional(),
  body("*.deleted")
    .isBoolean()
    .optional(),
  body("*.text")
    .isString()
    .optional()
];

export const attendEventValidator = [
  body("eventId").isString(),
  body("count").isNumeric()
];
