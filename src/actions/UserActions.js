import {
  REGISTER,
  FIND_USER,
  LOGOUT_USER,
  DELETE_USER,
  UPDATE_USER,
  FIND_CURRENT_USER_DATA
} from "../common/UserConstants";


// CREATE
export const register = (newUser) => ({
  type: REGISTER,
  newUser: newUser
})

// READ
export const findCurrentUser = (user) => ({
  type: FIND_USER,
  user: user
})

// READ
export const findCurrentUserData = (user) => ({
  type: FIND_CURRENT_USER_DATA,
  user: user
})


// DELETE
export const deleteCurrentUser = () => ({
  type: DELETE_USER
})

export const logout = () => ({
  type: LOGOUT_USER
})

// UPDATE
export const updateCurrentUser = (user) => ({
  type: UPDATE_USER,
  newUser: user
})

export default {
  register,
  logout,
  findCurrentUser,
  findCurrentUserData,
  deleteCurrentUser,
  updateCurrentUser
}
