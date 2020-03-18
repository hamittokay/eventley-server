import {
  addTaskToEvent,
  createEvent,
  getEvent,
  listEvents,
  updateTasks,
  fetchTasks,
  attendEvent
} from "./events.services";
import { validationResult } from "express-validator";

export const eventsController = {
  async create(req, res) {
    try {
      const { status, data } = await createEvent(req.body);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async listAll(req, res) {
    try {
      const { status, data } = await listEvents();

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const { status, data } = await getEvent(id);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async addTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const { eventId, tasks } = req.body;
      const { status, data } = await addTaskToEvent(eventId, tasks);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async updateTasks(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const tasks = req.body;
      const { status, data } = await updateTasks(tasks);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async getTasks(req, res) {
    try {
      const { eventId } = req.params;
      const { status, data } = await fetchTasks(eventId);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  },

  async attendEvent(req, res) {
    try {
      const { eventId, count } = req.body;
      const { status, data } = await attendEvent(eventId, count);

      res.status(status).send(data);
    } catch ({ message }) {
      res.status(500).send({
        message
      });
    }
  }
};
