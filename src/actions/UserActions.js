import {
  REGISTER,
  FIND_CURRENT_USER,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  FIND_CURRENT_USER_DATA_STORE,
  UPDATE_USER_RSVP,
  UPDATE_USER_PROFILE,
  CREATE_USER_HOSTED_EVENT,
  DELETE_USER_HOSTED_EVENT
} from "../common/UserConstants";


// CREATE
export const register = (newUser) => ({
  type: REGISTER,
  newUser: newUser
})

// READ
export const findCurrentUser = (user) => ({
  type: FIND_CURRENT_USER,
  user: user
})

// READ
export const findCurrentUserDataStore = (userData) => ({
  type: FIND_CURRENT_USER_DATA_STORE,
  userData: userData
})

export const login = (user) => ({
  type: LOGIN,
  user: user
})

export const logout = () => ({
  type: LOGOUT
})

export const updateCurrentUserProfile = (user, newProfile) => ({
  type: UPDATE_USER_PROFILE,
  user: user,
  newProfile: newProfile
})

export const updateCurrentUserRsvp = (user, invite, rsvpIndex) => ({
  type: UPDATE_USER_RSVP,
  user: user,
  invite: invite,
  rsvpIndex: rsvpIndex
})

export const createCurrentUserHostedEvent = (user, event) => ({
  type: CREATE_USER_HOSTED_EVENT,
  user: user,
  event: event
})

export const deleteCurrentUserHostedEvent = (user, eventId) => ({
  type: DELETE_USER_HOSTED_EVENT,
  user: user,
  eventId: eventId
})


export const deleteCurrentUser = () => ({
  type: DELETE_USER
})

export default {
  register,
  login,
  logout,
  findCurrentUser,
  findCurrentUserDataStore,
  updateCurrentUserRsvp,
  updateCurrentUserProfile,
  createCurrentUserHostedEvent,
  deleteCurrentUserHostedEvent,
  deleteCurrentUser
}
