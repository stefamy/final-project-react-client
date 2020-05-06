import {
  REGISTER,
  FIND_CURRENT_USER,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  FIND_CURRENT_USER_DATA_STORE,
  UPDATE_USER_INVITE,
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

export const updateCurrentUserInvite = (inviteIndex, invite) => ({
  type: UPDATE_USER_INVITE,
  invite: invite,
  inviteIndex: inviteIndex
})

export const createCurrentUserHostedEvent = (event) => ({
  type: CREATE_USER_HOSTED_EVENT,
  event: event
})

export const deleteCurrentUserHostedEvent = (eventId) => ({
  type: DELETE_USER_HOSTED_EVENT,
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
  updateCurrentUserInvite,
  updateCurrentUserProfile,
  createCurrentUserHostedEvent,
  deleteCurrentUserHostedEvent,
  deleteCurrentUser
}
