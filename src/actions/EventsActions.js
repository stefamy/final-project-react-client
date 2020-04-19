import { CREATE_EVENT, FIND_ALL_EVENTS } from "../common/EventsConstants";


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

//
// // DELETE
// export const deleteUser = () => ({
//   type: DELETE_USER
// })
//
// export const logout = () => ({
//   type: LOGOUT_USER
// })
//
// // UPDATE
// export const updateUser = (user) => ({
//   type: UPDATE_USER,
//   user: user
// })

export default {
  createEvent,
  findAllEvents
}
