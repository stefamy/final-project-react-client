import {
  REGISTER,
  FIND_CURRENT_USER,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  UPDATE_USER,
  FIND_CURRENT_USER_DATA, UPDATE_USER_RSVP
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
export const findCurrentUserData = (user) => ({
  type: FIND_CURRENT_USER_DATA,
  user: user
})

export const login = (user) => ({
  type: LOGIN,
  user: user
})

export const logout = () => ({
  type: DELETE_USER
})

// UPDATE
export const updateCurrentUser = (user) => ({
  type: UPDATE_USER,
  newUser: user
})


// UPDATE
export const updateCurrentUserRsvp = (user, invite, rsvpIndex) => ({
  type: UPDATE_USER_RSVP,
  user: user,
  invite: invite,
  rsvpIndex: rsvpIndex
})


// DELETE
export const deleteCurrentUser = () => ({
  type: DELETE_USER
})

export default {
  register,
  login,
  logout,
  findCurrentUser,
  findCurrentUserData,
  updateCurrentUser,
  updateCurrentUserRsvp,
  deleteCurrentUser
}
