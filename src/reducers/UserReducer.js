import _ from 'lodash';
import { REGISTER, FIND_USER, FIND_CURRENT_USER_DATA, LOGOUT_USER, DELETE_USER, UPDATE_USER } from "../common/UserConstants";

const initialState = {
  user: {}
}

const userReducer = (state = initialState, action) => {
  let user;
  switch (action.type) {

    case REGISTER:
      user = {};
      user.profile = _.cloneDeep(action.newUser)
      return {
        user: user
      }

    case FIND_USER:
      user = {};
      user.profile = _.cloneDeep(action.user)

      return {
        user: user
      }

    case FIND_CURRENT_USER_DATA:
      user = {};
      user.profile = _.cloneDeep(action.user.profile);
      user.hostedEvents = _.cloneDeep(action.user.events);
      user.rsvps = _.cloneDeep(action.user.rsvps);
      user.assignments = _.cloneDeep(action.user.assignments);
      user.reviews = _.cloneDeep(action.user.reviews);

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
      user = {};
      user.profile = _.cloneDeep(action.newUser)

      return {
        user: user
      }

    default:
      return state
  }
}

export default userReducer;

