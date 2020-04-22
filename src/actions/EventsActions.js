import { CREATE_EVENT, FIND_ALL_EVENTS, DELETE_EVENT } from "../common/EventsConstants";


// CREATE
export const createEvent = (event) => ({
  type: CREATE_EVENT,
  event: event
})

// READ
export const findAllEvents = (events) => ({
  type: FIND_ALL_EVENTS,
  events: events
})


// DELETE
export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId: eventId
})


export default {
  createEvent,
  findAllEvents,
  deleteEvent
}
