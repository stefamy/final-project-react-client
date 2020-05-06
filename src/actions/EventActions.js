import { FIND_EVENT_DATA, UPDATE_EVENT, CREATE_GUEST_INVITE, UPDATE_GUEST_INVITE, DELETE_GUEST_INVITE, CREATE_EVENT_TASK, UPDATE_EVENT_TASK, DELETE_EVENT_TASK } from "../common/EventConstants";


// EVENT OVERVIEW & LOGISTICS
export const findEventData = (eventData) => ({
  type: FIND_EVENT_DATA,
  eventData: eventData
})

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event: event,
})


// GUEST LIST
export const createGuestInvite = (newInvite) =>  ({
  type: CREATE_GUEST_INVITE,
  newInvite: newInvite,
})

export const updateGuestInvite = (updatedInvite) => ({
  type: UPDATE_GUEST_INVITE,
  updatedInvite: updatedInvite,
})

export const deleteGuestInvite = (inviteId) =>  ({
  type: DELETE_GUEST_INVITE,
  inviteId: inviteId,
})



// TASK LIST
export const createEventTask = (newTask) =>  ({
  type: CREATE_EVENT_TASK,
  newTask: newTask,
})

export const updateEventTask = (updatedTask) => ({
  type: UPDATE_EVENT_TASK,
  updatedTask: updatedTask,
})

export const deleteEventTask = (taskId) =>  ({
  type: DELETE_EVENT_TASK,
  taskId: taskId,
})




export default {
  findEventData,
  updateEvent,
  createGuestInvite,
  updateGuestInvite,
  deleteGuestInvite,
  createEventTask,
  updateEventTask,
  deleteEventTask
}
