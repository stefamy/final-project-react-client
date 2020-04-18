import { REGISTER, FIND_USER, LOGOUT_USER, DELETE_USER, UPDATE_USER } from "../common/UserConstants";


// CREATE
export const register = (newUser) => ({
  type: REGISTER,
  newUser: newUser
})

// READ
export const findUser = (user) => ({
  type: FIND_USER,
  user: user
})

// DELETE
export const deleteUser = () => ({
  type: DELETE_USER
})

export const logout = () => ({
  type: LOGOUT_USER
})

// UPDATE
export const updateUser = (user) => ({
  type: UPDATE_USER,
  user: user
})

export default {
  register,
  findUser,
  logout,
  deleteUser,
  updateUser
}
