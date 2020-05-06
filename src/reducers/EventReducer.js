import { FIND_EVENT_DATA, UPDATE_EVENT, CREATE_GUEST_INVITE, UPDATE_GUEST_INVITE, DELETE_GUEST_INVITE, CREATE_EVENT_TASK, UPDATE_EVENT_TASK, DELETE_EVENT_TASK } from "../common/EventConstants";
import _ from 'lodash';

const initialState = {
  id: '',
  logistics: {},
  guestList: [],
  taskList: []
}

const eventReducer = (state = initialState, action) => {
  let event, id, logistics, guestList, taskList;
  switch (action.type) {

    // EVENT OVERVIEW & LOGISTICS
    case FIND_EVENT_DATA:
      id = action.eventData.id;
      logistics = _.cloneDeep(action.eventData.logistics);
      guestList =  _.cloneDeep(action.eventData.guestList);
      taskList =  _.cloneDeep(action.eventData.taskList);

      return {
        id: id,
        logistics: logistics,
        guestList: guestList,
        taskList: taskList
      }

    case UPDATE_EVENT:
      id = action.event.id;
      logistics = _.cloneDeep(action.event.logistics);
      guestList =  _.cloneDeep(action.event.guestList);
      taskList =  _.cloneDeep(action.event.taskList);

      return {
        id: id,
        logistics: logistics,
        guestList: guestList,
        taskList: taskList
      }

    // GUEST LIST
    case CREATE_GUEST_INVITE:
      event = state;
      guestList = _.cloneDeep(state.guestList);
      guestList.push(action.newInvite);

      event.guestList = guestList;

      return {...event}

    case UPDATE_GUEST_INVITE:
      event = state;
      guestList = _.cloneDeep(state.guestList);

      const indexInGuestList = _.findIndex(guestList, {id: action.updatedInvite.id});
      guestList.splice(indexInGuestList, 1, action.updatedInvite);

      event.guestList = guestList;

      return {...event}

    case DELETE_GUEST_INVITE:
      event = state;

      guestList = _.cloneDeep(state.guestList);
      _.remove(guestList, {inviteId: action.inviteId})

      event.guestList = guestList;

      return {...event}


    // TASK LIST
    case CREATE_EVENT_TASK:
      event = state;
      taskList = _.cloneDeep(state.taskList);
      taskList.push(action.newTask);

      event.taskList = taskList;

      return {...event}

    case UPDATE_EVENT_TASK:
      event = state;
      taskList = _.cloneDeep(state.taskList);

      const indexInTaskList = _.findIndex(taskList, {id: action.updatedTask.id});
      taskList.splice(indexInGuestList, 1, action.updatedTask);

      event.taskList = taskList;

      return {...event}

    case DELETE_EVENT_TASK:
      event = state;

      taskList = _.cloneDeep(state.taskList);
      _.remove(taskList, {id: action.taskId})

      event.taskList = taskList;

      return {...event}


    // DEFAULT
    default:
      return state

  }
}

export default eventReducer;

