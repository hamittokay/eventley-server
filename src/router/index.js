import { eventsRouter } from "../modules/events/events.router";

export const appRouter = app => {
  app.use("/events", eventsRouter);
};
