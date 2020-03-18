import { ObjectID } from "mongodb";
import db from "../../db";
import { filterObject } from "../../utils/helpers";

/**
 * Creates new Event item and inserts to DB.
 * @param event {title, description, organizer, date, location}
 * @return {Promise<{data: {id: ObjectId, title: *}, status: number}>}
 */
export const createEvent = async event => {
  try {
    const { title, description, organizer, date, location } = event;

    const events = db.client.collection("events");
    const inserted = await events.insertOne({
      title,
      description,
      organizer,
      date,
      location,
      attendees: 0,
      created_at: new Date(),
      updated_at: new Date()
    });

    return {
      status: 201,
      data: {
        id: inserted.insertedId,
        title
      }
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Lists all the events.
 * @return data:
 *  count: number,
 *  events: Array
 * status: number
 */
export const listEvents = async () => {
  try {
    const events = db.client.collection("events");
    const eventList = await events
      .find()
      .limit(20)
      .toArray();

    return {
      status: 200,
      data: eventList
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Gets a single event item by provided Id.
 * @param id
 * @return {Promise<{data: void, status: number}>}
 */
export const getEvent = async id => {
  try {
    const events = db.client.collection("events");
    const event = await events.findOne(ObjectID(id));

    return {
      status: event ? 200 : 404,
      data: event ? event : null
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Attend to an event
 * @param eventId
 * @param count
 * @return {Promise<{data: null, status: number}>}
 */
export const attendEvent = async (eventId, count) => {
  try {
    const eventCollection = db.client.collection("events");

    eventCollection.updateOne(
      { _id: ObjectID(eventId) },
      {
        $inc: {
          attendees: count
        }
      }
    );

    return {
      status: 200,
      data: null
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Adds tasks to the events by provided event id.
 * @param eventId {String}
 * @param tasks {Array<Object>}
 * @return {Promise<{data: {eventId: *}, status: number}>}
 */
export const addTaskToEvent = async (eventId, tasks) => {
  try {
    const created_at = new Date();

    const _tasks = tasks.map(task => ({
      event_id: eventId,
      taken: false,
      text: task.text,
      deleted: false,
      created_at,
      updated_at: created_at
    }));

    const taskCollection = db.client.collection("tasks");
    await taskCollection.insertMany(_tasks);

    return {
      status: 201,
      data: {
        eventId
      }
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Updates the given Array of tasks
 * @param tasks
 * @return {Promise<{status: number}>}
 */
export const updateTasks = async tasks => {
  try {
    const updated_at = new Date();
    const taskCollection = db.client.collection("tasks");

    const updatableFields = ["text", "taken", "deleted"];

    tasks.forEach(({ id, ...task }) => {
      taskCollection.updateOne(
        { _id: ObjectID(id) },
        {
          $set: {
            ...filterObject(task, updatableFields),
            updated_at
          }
        }
      );
    });

    return {
      status: 200,
      data: null
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Fetches the tasks by provided event id.
 * @param eventId
 * @return {Promise<{data: any, status: number}>}
 */
export const fetchTasks = async eventId => {
  try {
    const taskCollection = db.client.collection("tasks");

    const tasks = await taskCollection
      .find({ event_id: eventId, taken: false })
      .toArray();

    return {
      status: 200,
      data: tasks
    };
  } catch (e) {
    throw new Error(e);
  }
};
