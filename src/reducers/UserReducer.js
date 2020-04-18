import _ from 'lodash';
import { REGISTER, FIND_USER, LOGOUT_USER, DELETE_USER, UPDATE_USER } from "../common/UserConstants";

const initialState = {
  user: {}
}

const userReducer = (state = initialState, action) => {
  let user;
  switch (action.type) {

    case REGISTER:
      user = _.cloneDeep(action.newUser)
      return {
        user: user
      }

    case FIND_USER:
      user = _.cloneDeep(action.user)

      return {
        user: user
      }

    case DELETE_USER:
      return {
        user: {}
      }

    case LOGOUT_USER:
      return {
        user: {}
      }

    case UPDATE_USER:
      user = _.cloneDeep(action.user)

      return {
        user: user
      }

    default:
      return state
  }
}

export default userReducer;

